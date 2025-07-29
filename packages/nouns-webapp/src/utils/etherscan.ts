import { mainnet, goerli, hardhat, baseSepolia, base } from 'wagmi/chains';
import { CHAIN_ID, ETHERSCAN_API_KEY } from '../config';

const getBaseURL = (network: number) => {
  switch (network) {
    case goerli.id:
      return 'https://goerli.etherscan.io/';
    case hardhat.id:
      return 'http://localhost:8545/'; // Local network, no explorer
    case baseSepolia.id:
      return 'https://sepolia.basescan.org/';
    case base.id:
      return 'https://basescan.org/';
    case mainnet.id:
    default:
      return 'https://etherscan.io/';
  }
};

const BASE_URL = getBaseURL(CHAIN_ID);

export const buildEtherscanTxLink = (txHash: string): string => {
  const path = `tx/${txHash}`;
  return new URL(path, BASE_URL).toString();
};

export const buildEtherscanAddressLink = (address: string): string => {
  const path = `address/${address}`;
  return new URL(path, BASE_URL).toString();
};

export const buildEtherscanTokenLink = (tokenContractAddress: string, tokenId: number): string => {
  const path = `token/${tokenContractAddress}?a=${tokenId}`;
  return new URL(path, BASE_URL).toString();
};

export const buildEtherscanHoldingsLink = (address: string): string => {
  const path = `tokenholdings?a=${address}`;
  return new URL(path, BASE_URL).toString();
};

const getApiBaseURL = (network: number) => {
  switch (network) {
    case goerli.id:
      return 'https://api-goerli.etherscan.io/';
    case hardhat.id:
      return 'http://localhost:8545/'; // Local network, no API
    case baseSepolia.id:
      return 'https://api-sepolia.basescan.org/';
    case base.id:
      return 'https://api.basescan.org/';
    case mainnet.id:
    default:
      return 'https://api.etherscan.io/';
  }
};

const API_BASE_URL = getApiBaseURL(CHAIN_ID);

export const buildEtherscanApiQuery = (
  address: string,
  module = 'contract',
  action = 'getsourcecode',
): string => {
  const params = new URLSearchParams({
    module,
    action,
    address,
    apikey: ETHERSCAN_API_KEY,
  });
  const path = `api?${params.toString()}`;
  return new URL(path, API_BASE_URL).toString();
};
