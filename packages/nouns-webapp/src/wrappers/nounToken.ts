import { useContractCall, useContractFunction, useEthers } from '@usedapp/core';
import { BigNumber as EthersBN, ethers, utils } from 'ethers';
// import { NounsTokenABI, NounsTokenFactory } from '@nouns/contracts';
import { NounsTokenABI } from '../contract';
import { NounsTokenFactory } from '../contract/abi';
import config, { cache, cacheKey, CHAIN_ID } from '../config';
import { useQuery } from '@apollo/client';
import { seedsQuery } from './subgraph';
import { useEffect } from 'react';

interface NounToken {
  name: string;
  description: string;
  image: string;
}

export interface INounSeed {
  background: number;
  backDecoration: number;
  backgroundDecoration: number;
  special: number;
  leftHand: number;
  back: number;
  clothe: number;
  choker: number;
  ear: number;
  hair: number;
  headphone: number;
  hat: number;
}

export enum NounsTokenContractFunction {
  delegateVotes = 'votesToDelegate',
}

const abi = new utils.Interface(NounsTokenABI);
const seedCacheKey = cacheKey(cache.seed, CHAIN_ID, config.addresses.nounsToken);

const isSeedValid = (seed: Record<string, any> | undefined) => {
  const expectedKeys = [
    'background',
    'backDecoration',
    'backgroundDecoration',
    'special',
    'leftHand',
    'back',
    'clothe',
    'choker',
    'ear',
    'hair',
    'headphone',
    'hat',
  ];
  const hasExpectedKeys = expectedKeys.every(key => (seed || {}).hasOwnProperty(key));
  const hasValidValues = Object.values(seed || {}).some(v => v !== 0);
  return hasExpectedKeys && hasValidValues;
};

export const useNounToken = (nounId: EthersBN) => {
  const [noun] =
    useContractCall<[string]>({
      abi,
      address: config.addresses.nounsToken,
      method: 'dataURI',
      args: [nounId],
    }) || [];

  if (!noun) {
    return;
  }

  const nounImgData = noun.split(';base64,').pop() as string;
  const json: NounToken = JSON.parse(atob(nounImgData));

  return json;
};

const seedArrayToObject = (seeds: (INounSeed & { id: string })[]) => {
  return seeds.reduce<Record<string, INounSeed>>((acc, seed) => {
    acc[seed.id] = {
      background: Number(seed.background),
      backDecoration: Number(seed.backDecoration),
      backgroundDecoration: Number(seed.backgroundDecoration),
      special: Number(seed.special),
      leftHand: Number(seed.leftHand),
      back: Number(seed.back),
      clothe: Number(seed.clothe),
      choker: Number(seed.choker),
      ear: Number(seed.ear),
      hair: Number(seed.hair),
      headphone: Number(seed.headphone),
      hat: Number(seed.hat),
    };
    return acc;
  }, {});
};

const useNounSeeds = () => {
  const cache = localStorage.getItem(seedCacheKey);
  console.log(`useNounSeeds cache: ${cache}`);
  const cachedSeeds = cache ? JSON.parse(cache) : undefined;
  console.log(`useNounSeeds cachedSeeds: ${JSON.stringify(cachedSeeds)}`);
  const { data } = useQuery(seedsQuery(), {
    skip: !!cachedSeeds,
  });
  console.log(`useNounSeeds data: ${JSON.stringify(data)}`);

  useEffect(() => {
    console.log(`useNounSeeds useEffect data: ${JSON.stringify(data)}`);
    console.log(`useNounSeeds data?.seeds?.length: ${data?.seeds?.length}`);
    if (!cachedSeeds && data?.seeds?.length) {
      localStorage.setItem(seedCacheKey, JSON.stringify(seedArrayToObject(data.seeds)));
    }
  }, [data, cachedSeeds]);

  return cachedSeeds;
};

export const useNounSeed = (nounId: EthersBN) => {
  console.log(`useNounSeed nounId: ${nounId}`);
  const seeds = useNounSeeds();
  console.log(`useNounSeed seeds: ${seeds}`);
  const seed = seeds?.[nounId.toString()];
  console.log(`useNounSeed seed: ${seed}`);
  // prettier-ignore
  const request = seed ? false : {
    abi,
    address: config.addresses.nounsToken,
    method: 'seeds',
    args: [nounId],
  };
  const response = useContractCall<INounSeed>(request);
  console.log(`useNounSeedresponse: ${response}`);
  if (response) {
    const seedCache = localStorage.getItem(seedCacheKey);
    console.log(`useNounSeed seedCache: ${seedCache}`);
    if (seedCache && isSeedValid(response)) {
      const updatedSeedCache = JSON.stringify({
        ...JSON.parse(seedCache),
        [nounId.toString()]: {
          background: response.background,
          backDecoration: response.backDecoration,
          backgroundDecoration: response.backgroundDecoration,
          special: response.special,
          leftHand: response.leftHand,
          back: response.back,
          clothe: response.clothe,
          choker: response.choker,
          ear: response.ear,
          hair: response.hair,
          headphone: response.headphone,
          hat: response.hat,
        },
      });
      console.log(`useNounSeed updatedSeedCache: ${updatedSeedCache}`);
      localStorage.setItem(seedCacheKey, updatedSeedCache);
    }

    return response;
  }
  return seed;
};

export const useUserVotes = (): number | undefined => {
  const { account } = useEthers();
  return useAccountVotes(account ?? ethers.constants.AddressZero);
};

export const useAccountVotes = (account?: string): number | undefined => {
  const [votes] =
    useContractCall<[EthersBN]>({
      abi,
      address: config.addresses.nounsToken,
      method: 'getCurrentVotes',
      args: [account],
    }) || [];
  return votes?.toNumber();
};

export const useUserDelegatee = (): string | undefined => {
  const { account } = useEthers();
  const [delegate] =
    useContractCall<[string]>({
      abi,
      address: config.addresses.nounsToken,
      method: 'delegates',
      args: [account],
    }) || [];
  return delegate;
};

export const useUserVotesAsOfBlock = (block: number | undefined): number | undefined => {
  const { account } = useEthers();
  // Check for available votes
  const [votes] =
    useContractCall<[EthersBN]>({
      abi,
      address: config.addresses.nounsToken,
      method: 'getPriorVotes',
      args: [account, block],
    }) || [];
  return votes?.toNumber();
};

export const useDelegateVotes = () => {
  const nounsToken = new NounsTokenFactory().attach(config.addresses.nounsToken);

  const { send, state } = useContractFunction(nounsToken, 'delegate');

  return { send, state };
};

export const useNounTokenBalance = (address: string): number | undefined => {
  const [tokenBalance] =
    useContractCall<[EthersBN]>({
      abi,
      address: config.addresses.nounsToken,
      method: 'balanceOf',
      args: [address],
    }) || [];
  return tokenBalance?.toNumber();
};

export const useUserNounTokenBalance = (): number | undefined => {
  const { account } = useEthers();

  const [tokenBalance] =
    useContractCall<[EthersBN]>({
      abi,
      address: config.addresses.nounsToken,
      method: 'balanceOf',
      args: [account],
    }) || [];
  return tokenBalance?.toNumber();
};
