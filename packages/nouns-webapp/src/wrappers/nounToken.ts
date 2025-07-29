import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { BigNumber as EthersBN, ethers, utils } from 'ethers';
import { NounsTokenABI } from '@nouns/contracts';
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

const abi = NounsTokenABI;
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
  const { data: noun } = useReadContract({
    abi,
    address: config.addresses.nounsToken as `0x${string}`,
    functionName: 'dataURI',
    args: [nounId],
  });

  if (!noun) {
    return;
  }

  const nounImgData = (noun as string).split(';base64,').pop() as string;
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
  const cachedSeeds = cache ? JSON.parse(cache) : undefined;
  const { data } = useQuery(seedsQuery(), {
    skip: !!cachedSeeds,
  });

  useEffect(() => {
    if (!cachedSeeds && data?.seeds?.length) {
      localStorage.setItem(seedCacheKey, JSON.stringify(seedArrayToObject(data.seeds)));
    }
  }, [data, cachedSeeds]);

  return cachedSeeds;
};

export const useNounSeed = (nounId: EthersBN): INounSeed => {
  const seeds = useNounSeeds();
  const seed = seeds?.[nounId.toString()];
  const { data: response } = useReadContract({
    abi,
    address: config.addresses.nounsToken as `0x${string}`,
    functionName: 'seeds',
    args: [nounId],
    query: { enabled: !seed },
  });

  if (response) {
    const seedCache = localStorage.getItem(seedCacheKey);
    if (seedCache && isSeedValid(response)) {
      const updatedSeedCache = JSON.stringify({
        ...JSON.parse(seedCache),
        [nounId.toString()]: {
          background: (response as any).background,
          backDecoration: (response as any).backDecoration,
          backgroundDecoration: (response as any).backgroundDecoration,
          special: (response as any).special,
          leftHand: (response as any).leftHand,
          back: (response as any).back,
          clothe: (response as any).clothe,
          choker: (response as any).choker,
          ear: (response as any).ear,
          hair: (response as any).hair,
          headphone: (response as any).headphone,
          hat: (response as any).hat,
        },
      });
      localStorage.setItem(seedCacheKey, updatedSeedCache);
    }
    return response as INounSeed;
  }
  return seed;
};

export const useUserVotes = (): number | undefined => {
  const { address } = useAccount();
  return useAccountVotes(address ?? ethers.constants.AddressZero);
};

export const useAccountVotes = (account?: string): number | undefined => {
  const { data: votes } = useReadContract({
    abi,
    address: config.addresses.nounsToken as `0x${string}`,
    functionName: 'getCurrentVotes',
    args: [account],
  });
  return votes ? Number(votes) : undefined;
};

export const useUserDelegatee = (): string | undefined => {
  const { address } = useAccount();
  const { data: delegate } = useReadContract({
    abi,
    address: config.addresses.nounsToken as `0x${string}`,
    functionName: 'delegates',
    args: [address],
  });
  return delegate as string | undefined;
};

export const useUserVotesAsOfBlock = (block: number | undefined): number | undefined => {
  const { address } = useAccount();
  const { data: votes } = useReadContract({
    abi,
    address: config.addresses.nounsToken as `0x${string}`,
    functionName: 'getPriorVotes',
    args: [address, block],
    query: { enabled: !!block },
  });
  return votes ? Number(votes) : undefined;
};

export const useDelegateVotes = () => {
  const { writeContract, data, error } = useWriteContract();

  const send = (delegatee: string) => {
    writeContract({
      address: config.addresses.nounsToken as `0x${string}`,
      abi,
      functionName: 'delegate',
      args: [delegatee],
    });
  };

  return { send, data, error };
};

export const useNounTokenBalance = (address: string): number | undefined => {
  const { data: tokenBalance } = useReadContract({
    abi,
    address: config.addresses.nounsToken as `0x${string}`,
    functionName: 'balanceOf',
    args: [address],
  });
  return tokenBalance ? Number(tokenBalance) : undefined;
};

export const useUserNounTokenBalance = (): number | undefined => {
  const { address } = useAccount();

  const { data: tokenBalance } = useReadContract({
    abi,
    address: config.addresses.nounsToken as `0x${string}`,
    functionName: 'balanceOf',
    args: [address],
  });
  return tokenBalance ? Number(tokenBalance) : undefined;
};

export const useNoundersDAO = (): string | undefined => {
  const { data: noundersDAO } = useReadContract({
    abi,
    address: config.addresses.nounsToken as `0x${string}`,
    functionName: 'noundersDAO',
    args: [],
  });
  return noundersDAO?.toString();
};
