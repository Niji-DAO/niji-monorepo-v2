import { Trans } from '@lingui/macro';
import { NounsAuctionHouseABI } from '@nouns/sdk';
import { useAccount, usePublicClient, useSimulateContract, useWriteContract } from 'wagmi';
import BigNumber from 'bignumber.js';
import { BigNumber as EthersBN, utils } from 'ethers';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Col, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import config from '../../config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useActiveLocale } from '../../hooks/useActivateLocale';
import { AlertModal, setAlertModal } from '../../state/slices/application';
import responsiveUiUtilsClasses from '../../utils/ResponsiveUIUtils.module.css';
import {
  Auction,
  AuctionHouseContractFunction,
  useAuctionMinBidIncPercentage,
  useSettleCurrentAndCreateNewAuction,
} from '../../wrappers/nounsAuction';
import SettleManuallyBtn from '../SettleManuallyBtn';
import WalletConnectModal from '../WalletConnectModal';
import classes from './Bid.module.css';

const computeMinimumNextBid = (
  currentBid: BigNumber,
  minBidIncPercentage: BigNumber | undefined,
): BigNumber => {
  if (!minBidIncPercentage) {
    return new BigNumber(0);
  }
  return currentBid
    .times(minBidIncPercentage.div(100).plus(1))
    .decimalPlaces(0, BigNumber.ROUND_UP);
};

const minBidEth = (minBid: BigNumber): string => {
  if (minBid.isZero()) {
    return '0.01';
  }

  const eth = utils.formatEther(EthersBN.from(minBid.toFixed(0)));
  return new BigNumber(eth).toFixed(2, BigNumber.ROUND_CEIL);
};

const currentBid = (bidInputRef: React.RefObject<HTMLInputElement>) => {
  if (!bidInputRef.current || !bidInputRef.current.value) {
    return new BigNumber(0);
  }
  return new BigNumber(utils.parseEther(bidInputRef.current.value).toString());
};

const Bid: React.FC<{
  auction: Auction;
  auctionEnded: boolean;
}> = props => {
  const activeAccount = useAppSelector(state => state.account.activeAccount);
  const provider = usePublicClient();
  let { auction, auctionEnded } = props;
  const activeLocale = useActiveLocale();
  const nounsAuctionHouseContractAddress = config.addresses.nounsAuctionHouseProxy;

  const account = useAppSelector(state => state.account.activeAccount);

  const bidInputRef = useRef<HTMLInputElement>(null);

  const [bidInput, setBidInput] = useState('');

  const [bidButtonContent, setBidButtonContent] = useState({
    loading: false,
    content: auctionEnded ? <Trans>Settle</Trans> : <Trans>Place bid</Trans>,
  });

  const [showConnectModal, setShowConnectModal] = useState(false);

  const hideModalHandler = () => {
    setShowConnectModal(false);
  };

  const dispatch = useAppDispatch();
  const setModal = useCallback((modal: AlertModal) => dispatch(setAlertModal(modal)), [dispatch]);

  const minBidIncPercentage = useAuctionMinBidIncPercentage();
  const minBid = computeMinimumNextBid(
    auction && new BigNumber(auction.amount.toString()),
    minBidIncPercentage,
  );

  // const { data: placeBidSimulation } = useSimulateContract({
  //   address: nounsAuctionHouseContractAddress as `0x${string}`,
  //   abi: NounsAuctionHouseABI,
  //   functionName: AuctionHouseContractFunction.createBid,
  //   args: [BigInt(auction.nounId.toString())],
  //   value: bidInput ? BigInt(utils.parseEther(bidInput).toString()) : BigInt(0),
  //   query: { enabled: !!bidInput && !auctionEnded },
  // });

  const { writeContract: placeBid, status: placeBidStatus, error: placeBidError } = useWriteContract();

  const { send: settleAuction, state: settleAuctionState } = useSettleCurrentAndCreateNewAuction();

  const bidInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    // disable more than 2 digits after decimal point
    if (input.includes('.') && event.target.value.split('.')[1].length > 2) {
      return;
    }

    setBidInput(event.target.value);
  };

  const placeBidHandler = async () => {
    if (!auction || !bidInputRef.current || !bidInputRef.current.value) {
      return;
    }

    if (currentBid(bidInputRef).isLessThan(minBid)) {
      setModal({
        show: true,
        title: <Trans>Insufficient bid amount 🤏</Trans>,
        message: (
          <Trans>
            Please place a bid higher than or equal to the minimum bid amount of {minBidEth(minBid)}{' '}
            ETH
          </Trans>
        ),
      });
      setBidInput(minBidEth(minBid));
      return;
    }

    // if (placeBidSimulation?.request) {
    //   const gasLimit = placeBidSimulation.request.gas;
    //   const paddedGas = gasLimit ? gasLimit + BigInt(10000) : undefined;
    //   placeBid({ ...placeBidSimulation.request, gas: paddedGas });
    // }
  };

  const settleAuctionHandler = () => {
    settleAuction();
  };

  const clearBidInput = () => {
    if (bidInputRef.current) {
      bidInputRef.current.value = '';
    }
  };

  // successful bid using redux store state
  useEffect(() => {
    if (!account) return;

    // tx state is mining
    const isMiningUserTx = placeBidStatus === 'pending';
    // allows user to rebid against themselves so long as it is not the same tx
    const isCorrectTx = currentBid(bidInputRef).isEqualTo(new BigNumber(auction.amount.toString()));
    if (isMiningUserTx && auction.bidder === account && isCorrectTx) {
      // placeBidStatus.status = 'success'; // This line is problematic, cannot assign to status directly
      setModal({
        title: <Trans>Success</Trans>,
        message: <Trans>Bid was placed successfully!</Trans>,
        show: true,
      });
      setBidButtonContent({ loading: false, content: <Trans>Place bid</Trans> });
      clearBidInput();
    }
  }, [auction, placeBidStatus, account, setModal]);

  // placing bid transaction state hook
  useEffect(() => {
    switch (!auctionEnded && placeBidStatus) {
      case 'idle':
        setBidButtonContent({
          loading: false,
          content: <Trans>Place bid</Trans>,
        });
        break;
      case 'pending':
        setBidButtonContent({ loading: true, content: <></> });
        break;
      case 'error':
        setModal({
          title: <Trans>Transaction Failed</Trans>,
          message: placeBidStatus === 'error' ? placeBidError?.message : <Trans>Please try again.</Trans>,
          show: true,
        });
        setBidButtonContent({ loading: false, content: <Trans>Bid</Trans> });
        break;
      case 'success':
        setModal({
          title: <Trans>Success</Trans>,
          message: <Trans>Bid was placed successfully!</Trans>,
          show: true,
        });
        setBidButtonContent({ loading: false, content: <Trans>Place bid</Trans> });
        clearBidInput();
        break;
    }
  }, [placeBidStatus, auctionEnded, setModal]);

  // settle auction transaction state hook
  useEffect(() => {
    switch (auctionEnded && settleAuctionState.status) {
      case 'idle':
        setBidButtonContent({
          loading: false,
          content: <Trans>Settle Auction</Trans>,
        });
        break;
      case 'pending':
        setBidButtonContent({ loading: true, content: <></> });
        break;
      case 'success':
        setModal({
          title: <Trans>Success</Trans>,
          message: <Trans>Settled auction successfully!</Trans>,
          show: true,
        });
        setBidButtonContent({ loading: false, content: <Trans>Settle Auction</Trans> });
        break;
      case 'error':
        setModal({
          title: <Trans>Transaction Failed</Trans>,
          message: settleAuctionState?.error?.message || <Trans>Please try again.</Trans>,
          show: true,
        });
        setBidButtonContent({ loading: false, content: <Trans>Settle Auction</Trans> });
        break;
    }
  }, [settleAuctionState, auctionEnded, setModal]);

  if (!auction) return null;

  const isDisabled =
    placeBidStatus === 'pending' || settleAuctionState.status === 'pending' || !activeAccount;

  const isWalletConnected = activeAccount !== undefined;

  return (
    <>
      {showConnectModal && activeAccount === undefined && (
        <WalletConnectModal onDismiss={hideModalHandler} />
      )}
      <InputGroup>
        {!auctionEnded && (
          <>
            <span className={classes.customPlaceholderBidAmt}>
              {!auctionEnded && !bidInput ? (
                <>
                  Ξ {minBidEth(minBid)}{' '}
                  <span
                    className={
                      activeLocale === 'ja-JP' ? responsiveUiUtilsClasses.disableSmallScreens : ''
                    }
                  >
                    <Trans>or more</Trans>
                  </span>
                </>
              ) : (
                ''
              )}
            </span>
            <FormControl
              className={classes.bidInput}
              type="number"
              min="0"
              onChange={bidInputHandler}
              ref={bidInputRef}
              value={bidInput}
            />
          </>
        )}
        {!auctionEnded ? (
          <Button
            className={auctionEnded ? classes.bidBtnAuctionEnded : classes.bidBtn}
            onClick={auctionEnded ? settleAuctionHandler : placeBidHandler}
            disabled={isDisabled}
          >
            {bidButtonContent.loading ? <Spinner animation="border" /> : bidButtonContent.content}
          </Button>
        ) : (
          <>
            {/* Only show force settle button if wallet connected */}
            {isWalletConnected && (
              <Col lg={12}>
                <SettleManuallyBtn settleAuctionHandler={settleAuctionHandler} auction={auction} />
              </Col>
            )}
          </>
        )}
      </InputGroup>
    </>
  );
};
export default Bid;
