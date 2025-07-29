import { ApolloProvider, useQuery } from '@apollo/client';
import { WebSocketProvider } from '@ethersproject/providers';
import { NounsAuctionHouseFactory } from '@nouns/sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BigNumber, BigNumberish } from 'ethers';

import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore, PreloadedState } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { WagmiProvider } from 'wagmi';
import App from './App';
import config from './config';
import { useAppDispatch, useAppSelector } from './hooks';
import { LanguageProvider } from './i18n/LanguageProvider';
import './index.css';
import reportWebVitals from './reportWebVitals';
import account from './state/slices/account';
import application from './state/slices/application';
import auction, {
  appendBid,
  reduxSafeAuction,
  reduxSafeBid,
  reduxSafeNewAuction,
  setActiveAuction,
  setAuctionExtended,
  setAuctionSettled,
  setFullAuction,
} from './state/slices/auction';
import logs from './state/slices/logs';
import onDisplayAuction, {
  setLastAuctionNounId,
  setOnDisplayAuctionNounId,
} from './state/slices/onDisplayAuction';
import pastAuctions, { addPastAuctions } from './state/slices/pastAuctions';
import LogsUpdater from './state/updaters/logs';
import { nounPath } from './utils/history';
import { clientFactory, latestAuctionsQuery } from './wrappers/subgraph';
import { BrowserRouter, useNavigate } from 'react-router-dom';



const createRootReducer = () =>
  combineReducers({
    account,
    application,
    auction,
    logs,
    pastAuctions,
    onDisplayAuction,
  });

export default function configureStore(preloadedState: PreloadedState<any>) {
  const store = createStore(
    createRootReducer(), // root reducer with router state
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        // ... other middlewares ...
      ),
    ),
  );

  return store;
}

const store = configureStore({});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { wagmiConfig } from './utils/appkit';

const queryClient = new QueryClient();

const client = clientFactory(config.app?.subgraphApiUri || 'https://api.thegraph.com/subgraphs/name/cnnouns/cnnouns-subgraph');

const Updaters = () => {
  return (
    <>
      <LogsUpdater />
    </>
  );
};

const BLOCKS_PER_DAY = 7_200;

const ChainSubscriber: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loadState = async () => {
    const wsProvider = new WebSocketProvider(config.app.wsRpcUri);
    const nounsAuctionHouseContract = NounsAuctionHouseFactory.connect(
      config.addresses.nounsAuctionHouseProxy,
      wsProvider,
    );

    const bidFilter = nounsAuctionHouseContract.filters.AuctionBid(null, null, null, null);
    const extendedFilter = nounsAuctionHouseContract.filters.AuctionExtended(null, null);
    const createdFilter = nounsAuctionHouseContract.filters.AuctionCreated(null, null, null);
    const settledFilter = nounsAuctionHouseContract.filters.AuctionSettled(null, null, null);
    const processBidFilter = async (
      nounId: BigNumberish,
      sender: string,
      value: BigNumberish,
      extended: boolean,
      event: any,
    ) => {
      const timestamp = (await event.getBlock()).timestamp;
      const transactionHash = event.transactionHash;
      dispatch(
        appendBid(reduxSafeBid({ nounId, sender, value, extended, transactionHash, timestamp })),
      );
    };
    const processAuctionCreated = (
      nounId: BigNumberish,
      startTime: BigNumberish,
      endTime: BigNumberish,
    ) => {
      dispatch(
        setActiveAuction(reduxSafeNewAuction({ nounId, startTime, endTime, settled: false })),
      );
      const nounIdNumber = BigNumber.from(nounId).toNumber();
      navigate(nounPath(nounIdNumber));
      dispatch(setOnDisplayAuctionNounId(nounIdNumber));
      dispatch(setLastAuctionNounId(nounIdNumber));
    };
    const processAuctionExtended = (nounId: BigNumberish, endTime: BigNumberish) => {
      dispatch(setAuctionExtended({ nounId, endTime }));
    };
    const processAuctionSettled = (nounId: BigNumberish, winner: string, amount: BigNumberish) => {
      dispatch(setAuctionSettled({ nounId, amount, winner }));
    };

    // Fetch the current auction
    const currentAuction = await nounsAuctionHouseContract.auction();
    dispatch(setFullAuction(reduxSafeAuction(currentAuction)));
    dispatch(setLastAuctionNounId(currentAuction.nounId.toNumber()));

    // Fetch the previous 24 hours of bids
    const previousBids = await nounsAuctionHouseContract.queryFilter(bidFilter, 0 - BLOCKS_PER_DAY);
    for (let event of previousBids) {
      if (event.args === undefined) return;
      processBidFilter(...(event.args as [BigNumber, string, BigNumber, boolean]), event);
    }

    nounsAuctionHouseContract.on(bidFilter, (nounId, sender, value, extended, event) =>
      processBidFilter(nounId, sender, value, extended, event),
    );
    nounsAuctionHouseContract.on(createdFilter, (nounId, startTime, endTime) =>
      processAuctionCreated(nounId, startTime, endTime),
    );
    nounsAuctionHouseContract.on(extendedFilter, (nounId, endTime) =>
      processAuctionExtended(nounId, endTime),
    );
    nounsAuctionHouseContract.on(settledFilter, (nounId, winner, amount) =>
      processAuctionSettled(nounId, winner, amount),
    );
  };
  loadState();

  return <></>;
};

const PastAuctions: React.FC = () => {
  const latestAuctionId = useAppSelector(state => state.onDisplayAuction.lastAuctionNounId);
  const { data } = useQuery(latestAuctionsQuery());
  const dispatch = useAppDispatch();

  useEffect(() => {
    data && dispatch(addPastAuctions({ data }));
  }, [data, latestAuctionId, dispatch]);

  return <></>;
};

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
        {/* <ChainSubscriber /> */}
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <ApolloProvider client={client}>
              <PastAuctions />
              <LanguageProvider>
                <App />
              </LanguageProvider>
              <Updaters />
            </ApolloProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();