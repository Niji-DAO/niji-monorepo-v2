import { Chain } from '@usedapp/core';

export const BaseSepoliaChain: Chain = {
  chainId: 84532,
  chainName: 'Base Sepolia',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x0000000000000000000000000000000000000000',
  getExplorerAddressLink: (address: string) => `https://sepolia.basescan.org/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://sepolia.basescan.org/tx/${transactionHash}`,
  rpcUrl: 'https://sepolia.base.org',
  blockExplorerUrl: 'https://sepolia-explorer.base.org',
  nativeCurrency: {
    name: 'Base Sepolia',
    symbol: 'ETH',
    decimals: 18,
  },
};
