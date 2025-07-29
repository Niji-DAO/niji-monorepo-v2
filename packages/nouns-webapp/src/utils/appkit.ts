import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { hardhat, baseSepolia, base } from '@reown/appkit/networks';
import { injected, metaMask, walletConnect, coinbaseWallet } from '@wagmi/connectors';

// Import wallet assets
import metamaskIcon from '../assets/wallet-brand-assets/metamask-fox.svg';
import walletconnectIcon from '../assets/wallet-brand-assets/walletconnect-logo.svg';
import coinbaseIcon from '../assets/wallet-brand-assets/coinbase-wallet-dot.svg';

// Get projectId from https://cloud.reown.com (previously https://cloud.walletconnect.com)
const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID || 'fc1e78f6054e44788e18289b02c4b34f';

const metadata = {
  name: 'NIJI DAO',
  description: 'NIJI DAO Auction House',
  url: 'https://niji.wtf',
  icons: ['https://niji.wtf/favicon.ico']
};

export const chains = [hardhat, baseSepolia, base];

// Create Wagmi Adapter with explicit connectors
const wagmiAdapter = new WagmiAdapter({
  networks: chains as any,
  projectId,
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ 
      projectId,
      metadata: {
        name: 'NIJI DAO',
        description: 'NIJI DAO Auction House',
        url: 'https://niji.wtf',
        icons: ['https://niji.wtf/favicon.ico']
      }
    }),
    coinbaseWallet({
      appName: 'NIJI DAO',
    }),
  ],
});

// Create the AppKit instance
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: chains as any,
  metadata,
  features: {
    analytics: false,
  },
  // Optional: Override connector images if needed
  connectorImages: {
    // EIP6963 wallets use RDNS format
    'io.metamask': metamaskIcon,
    'com.coinbase.wallet': coinbaseIcon,
    // Other connectors use their IDs
    walletConnect: walletconnectIcon,
    injected: metamaskIcon, // fallback for injected wallets
    metaMask: metamaskIcon,
    coinbaseWallet: coinbaseIcon,
  },
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;