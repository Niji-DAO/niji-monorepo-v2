import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useAppDispatch, useAppSelector } from './hooks';
import { setActiveAccount } from './state/slices/account';
import { Routes, Route, Navigate } from 'react-router-dom';
import { setAlertModal } from './state/slices/application';
import classes from './App.module.css';
import '../src/css/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertModal from './components/Modal';
import NavBar from './components/NavBar';
import NetworkAlert from './components/NetworkAlert';
import Footer from './components/Footer';
import AuctionPage from './pages/Auction';
import GovernancePage from './pages/Governance';
import CreateProposalPage from './pages/CreateProposal';
import VotePage from './pages/Vote';
import NotFoundPage from './pages/NotFound';
import Playground from './pages/Playground';
import { CHAIN_ID } from './config';
import relativeTime from 'dayjs/plugin/relativeTime';

import dayjs from 'dayjs';
import DelegatePage from './pages/DelegatePage';

function App() {
  const { address, chainId, isConnecting, isReconnecting } = useAccount();
  const [cachedChainId, setCachedChainId] = useState(chainId);
  const dispatch = useAppDispatch();
  dayjs.extend(relativeTime);

  useEffect(() => {
    // Local account array updated
    dispatch(setActiveAccount(address));
  }, [address, dispatch]);

  useEffect(() => {
    if (!isConnecting && !isReconnecting) {
      setCachedChainId(chainId);
    }
  }, [chainId, isConnecting, isReconnecting]);

  const alertModal = useAppSelector(state => state.application.alertModal);

  return (
    <div className={`${classes.wrapper}`}>
      {address && Number(CHAIN_ID) !== cachedChainId && <NetworkAlert />}
      {alertModal.show && (
        <AlertModal
          title={alertModal.title}
          content={<p>{alertModal.message}</p>}
          onDismiss={() => dispatch(setAlertModal({ ...alertModal, show: false }))}
        />
      )}
      <NavBar />
      <Routes>
        <Route path="/" element={<AuctionPage />} />
        <Route path="/auction/:id" element={<Navigate to="/noun/:id" replace />} />
        <Route
          path="/noun/:id"
          element={<AuctionPage />}
        />
        <Route path="/create-proposal" element={<CreateProposalPage />} />
        <Route path="/vote" element={<GovernancePage />} />
        <Route path="/vote/:id" element={<VotePage />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/delegate" element={<DelegatePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;