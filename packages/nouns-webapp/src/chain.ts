import { Chain } from '@usedapp/core';

export const BaseSepoliaChain: Chain = {
  chainId: 84532,
  chainName: 'Base Sepolia',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
  getExplorerAddressLink: (address: string) => `https://sepolia.basescan.org/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://sepolia.basescan.org/tx/${transactionHash}`,
  // rpcUrl: 'https://sepolia.base.org',
  rpcUrl: 'wss://base-sepolia-rpc.publicnode.com',
  blockExplorerUrl: 'https://sepolia-explorer.base.org',
  nativeCurrency: {
    name: 'Base Sepolia',
    symbol: 'ETH',
    decimals: 18,
  },
};
