import { mainnet, goerli, hardhat, baseSepolia } from 'wagmi/chains';
import {
  ContractAddresses as NounsContractAddresses,
  getContractAddressesForChainOrThrow,
} from './contract';

interface ExternalContractAddresses {
  lidoToken: string | undefined;
  usdcToken: string | undefined;
  chainlinkEthUsdc: string | undefined;
  payerContract: string | undefined;
  tokenBuyer: string | undefined;
}

export type ContractAddresses = NounsContractAddresses & ExternalContractAddresses;

interface AppConfig {
  jsonRpcUri: string;
  wsRpcUri: string;
  subgraphApiUri: string;
  enableHistory: boolean;
}

type SupportedChains = typeof mainnet.id | typeof goerli.id | typeof hardhat.id | typeof baseSepolia.id;

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

export const CHAIN_ID: SupportedChains = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1') as SupportedChains;

export const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY ?? '';

const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID;

export const createNetworkHttpUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_JSONRPC`];
  return custom || `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`;
};

export const createNetworkWsUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_WSRPC`];
  return custom || `wss://${network}.infura.io/ws/v3/${INFURA_PROJECT_ID}`;
};

const app: Record<SupportedChains, AppConfig> = {
  [goerli.id]: {
    jsonRpcUri: createNetworkHttpUrl('goerli'),
    wsRpcUri: createNetworkWsUrl('goerli'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/tnplimited/cnnouns-subgraph-goerli',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [mainnet.id]: {
    jsonRpcUri: createNetworkHttpUrl('mainnet'),
    wsRpcUri: createNetworkWsUrl('mainnet'),
    subgraphApiUri: 'https://api.studio.thegraph.com/query/50842/nouns/version/latest',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [hardhat.id]: {
    jsonRpcUri: 'http://localhost:8545',
    wsRpcUri: 'ws://localhost:8545',
    subgraphApiUri: 'http://localhost:8000/subgraphs/name/nounsdao/nouns-subgraph-hardhat',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [baseSepolia.id]: {
    jsonRpcUri: createNetworkHttpUrl('base-sepolia'),
    wsRpcUri: createNetworkWsUrl('base-sepolia'),
    subgraphApiUri: 'https://api.studio.thegraph.com/query/91004/niji-testnet/version/latest',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
};

const externalAddresses: Record<SupportedChains, ExternalContractAddresses> = {
  [goerli.id]: {
    lidoToken: '0x2DD6530F136D2B56330792D46aF959D9EA62E276',
    usdcToken: undefined, // '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
    payerContract: undefined,
    tokenBuyer: undefined,
    chainlinkEthUsdc: undefined,
  },
  [mainnet.id]: {
    lidoToken: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
    usdcToken: undefined, // '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    chainlinkEthUsdc: undefined, // '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    payerContract: undefined,
    tokenBuyer: undefined,
  },
  [hardhat.id]: {
    lidoToken: undefined,
    usdcToken: undefined,
    payerContract: undefined,
    tokenBuyer: undefined,
    chainlinkEthUsdc: undefined,
  },
  [baseSepolia.id]: {
    lidoToken: undefined,
    usdcToken: undefined,
    payerContract: undefined,
    tokenBuyer: undefined,
    chainlinkEthUsdc: undefined,
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

export const multicallOnLocalhost = '0x9A676e781A523b5d0C0e43731313A708CB607508';
