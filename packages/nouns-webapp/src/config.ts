// import {
//   ContractAddresses as NounsContractAddresses,
//   getContractAddressesForChainOrThrow,
// } from '@nouns/sdk';
import type { ContractAddresses as NounsContractAddresses } from './contract';
import { getContractAddressesForChainOrThrow } from './contract';
import { ChainId } from '@usedapp/core';
import { BaseSepoliaChain } from './chain';

interface ExternalContractAddresses {
  lidoToken: string | undefined;
}

export type ContractAddresses = NounsContractAddresses & ExternalContractAddresses;

interface AppConfig {
  jsonRpcUri: string;
  wsRpcUri: string;
  subgraphApiUri: string;
  enableHistory: boolean;
}

// type SupportedChains =
//   | ChainId.Rinkeby
//   | ChainId.Mainnet
//   | ChainId.Hardhat
//   | ChainId.Goerli
//   | typeof BaseSepoliaChain;

interface CacheBucket {
  name: string;
  version: string;
}

export const cache: Record<string, CacheBucket> = {
  seed: {
    name: 'seed',
    version: 'v1',
  },
  ens: {
    name: 'ens',
    version: 'v1',
  },
};

export const cacheKey = (bucket: CacheBucket, ...parts: (string | number)[]) => {
  return [bucket.name, bucket.version, ...parts].join('-').toLowerCase();
};

export const CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '4');
console.log('CHAIN_ID', CHAIN_ID);

export const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY ?? '';

const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID;
console.log('INFURA_PROJECT_ID', INFURA_PROJECT_ID);

export const createNetworkHttpUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_JSONRPC`];
  return custom || `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`;
};

export const createNetworkWsUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_WSRPC`];
  return custom || `wss://${network}.infura.io/ws/v3/${INFURA_PROJECT_ID}`;
};

const app: Record<number, AppConfig> = {
  [ChainId.Rinkeby]: {
    jsonRpcUri: createNetworkHttpUrl('rinkeby'),
    wsRpcUri: createNetworkWsUrl('rinkeby'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph-rinkeby-v5',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [ChainId.Goerli]: {
    jsonRpcUri: createNetworkHttpUrl('goerli'),
    wsRpcUri: createNetworkWsUrl('goerli'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/bcjgit/dao-v2-test',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [ChainId.Mainnet]: {
    jsonRpcUri: createNetworkHttpUrl('mainnet'),
    wsRpcUri: createNetworkWsUrl('mainnet'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [ChainId.Hardhat]: {
    jsonRpcUri: 'http://localhost:8545',
    wsRpcUri: 'ws://localhost:8545',
    subgraphApiUri: 'http://localhost:8000/subgraphs/name/nounsdao/nouns-subgraph',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [ChainId.Sepolia]: {
    jsonRpcUri: createNetworkHttpUrl('sepolia'),
    wsRpcUri: createNetworkWsUrl('sepolia'),
    subgraphApiUri: 'https://api.studio.thegraph.com/query/91004/niji-testnet/version/latest',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [BaseSepoliaChain.chainId]: {
    jsonRpcUri: createNetworkHttpUrl('base-sepolia'),
    wsRpcUri: createNetworkWsUrl('base-sepolia'),
    subgraphApiUri: 'https://api.studio.thegraph.com/query/91004/niji-testnet/version/latest',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
};

console.log(`app: ${JSON.stringify(app)}`);

const externalAddresses: Record<number, ExternalContractAddresses> = {
  [ChainId.Rinkeby]: {
    lidoToken: '0xF4242f9d78DB7218Ad72Ee3aE14469DBDE8731eD',
  },
  [ChainId.Goerli]: {
    lidoToken: '0x2DD6530F136D2B56330792D46aF959D9EA62E276',
  },
  [ChainId.Mainnet]: {
    lidoToken: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  },
  [ChainId.Hardhat]: {
    lidoToken: undefined,
  },
  [ChainId.Sepolia]: {
    lidoToken: undefined,
  },
  [BaseSepoliaChain.chainId]: {
    lidoToken: undefined,
  },
};

const getAddresses = (): ContractAddresses => {
  let nounsAddresses = {} as NounsContractAddresses;
  try {
    nounsAddresses = getContractAddressesForChainOrThrow(CHAIN_ID);
  } catch {}
  return { ...nounsAddresses, ...externalAddresses[CHAIN_ID] };
};

const config = {
  app: app[CHAIN_ID],
  addresses: getAddresses(),
};

export default config;

// export const multicallOnLocalhost = '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e';
export const multicallOnLocalhost = '0x9A676e781A523b5d0C0e43731313A708CB607508';
