import { useReadContract, useSimulateContract, useWriteContract } from 'wagmi';
import BigNumber from 'bignumber.js';
import { BigNumber as EthersBN } from 'ethers';
import { NounsAuctionHouseABI } from '@nouns/sdk';
import config from '../config';
import { useAppSelector } from '../hooks';
import { AuctionState } from '../state/slices/auction';
import { isNounderNoun } from '../utils/nounderNoun';

export enum AuctionHouseContractFunction {
  auction = 'auction',
  duration = 'duration',
  minBidIncrementPercentage = 'minBidIncrementPercentage',
  nouns = 'nouns',
  createBid = 'createBid',
  settleCurrentAndCreateNewAuction = 'settleCurrentAndCreateNewAuction',
}

export interface Auction {
  amount: EthersBN;
  bidder: string;
  endTime: EthersBN;
  startTime: EthersBN;
  nounId: EthersBN;
  settled: boolean;
}

const abi = NounsAuctionHouseABI;

export const useAuction = (auctionHouseProxyAddress: string) => {
  const { data: auction } = useReadContract({
    abi,
    address: auctionHouseProxyAddress as `0x${string}`,
    functionName: 'auction',
    args: [],
  });
  return auction;
};

export const useAuctionMinBidIncPercentage = () => {
  const { data: minBidIncrement } = useReadContract({
    abi,
    address: config.addresses.nounsAuctionHouseProxy as `0x${string}`,
    functionName: 'minBidIncrementPercentage',
    args: [],
  });

  if (!minBidIncrement) {
    return;
  }

  return new BigNumber(minBidIncrement.toString());
};

/**
 * Computes timestamp after which a Noun could vote
 * @param nounId TokenId of Noun
 * @returns Unix timestamp after which Noun could vote
 */
export const useNounCanVoteTimestamp = (nounId: number) => {
  const nextNounId = nounId + 1;

  const nextNounIdForQuery = isNounderNoun(EthersBN.from(nextNounId)) ? nextNounId + 1 : nextNounId;

  const pastAuctions = useAppSelector(state => state.pastAuctions.pastAuctions);

  const maybeNounCanVoteTimestamp = pastAuctions.find((auction: AuctionState, i: number) => {
    const maybeNounId = auction.activeAuction?.nounId;
    return maybeNounId ? EthersBN.from(maybeNounId).eq(EthersBN.from(nextNounIdForQuery)) : false;
  })?.activeAuction?.startTime;

  if (!maybeNounCanVoteTimestamp) {
    // This state only occurs during loading flashes
    return EthersBN.from(0);
  }

  return EthersBN.from(maybeNounCanVoteTimestamp);
};

export const useSettleCurrentAndCreateNewAuction = () => {
  const { data: simulation } = useSimulateContract({
    address: config.addresses.nounsAuctionHouseProxy as `0x${string}`,
    abi,
    functionName: AuctionHouseContractFunction.settleCurrentAndCreateNewAuction,
    args: [],
  });

  const { writeContract, ...state } = useWriteContract();

  const send = async () => {
    if (simulation?.request) {
      const gasLimit = simulation.request.gas;
      const paddedGas = gasLimit ? gasLimit + BigInt(45000) : undefined;
      writeContract({ ...simulation.request, gas: paddedGas });
    }
  };

  return {
    send,
    state,
  };
};
