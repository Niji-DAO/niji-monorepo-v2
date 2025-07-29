import { Modal, Button } from 'react-bootstrap';
import { CHAIN_ID } from '../../config';
import { useSwitchChain, useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { useAppKit } from '@reown/appkit/react';

const networkName = () => {
  switch (Number(CHAIN_ID)) {
    case 1:
      return 'Ethereum Mainnet';
    case 5:
      return 'the Goerli network';
    case 31337:
      return 'Hardhat Local Network';
    case 84532:
      return 'Base Sepolia Testnet';
    case 8453:
      return 'Base';
    default:
      return `Network ${CHAIN_ID}`;
  }
};

const metamaskNetworkName = () => {
  switch (Number(CHAIN_ID)) {
    case 1:
      return 'Ethereum Mainnet';
    case 5:
      return 'Goerli Test Network';
    default:
      return `Network ${CHAIN_ID}`;
  }
};

const NetworkAlert = () => {
  const { switchChain, chains, error: switchError, isPending } = useSwitchChain();
  const { isConnected, chain } = useAccount();
  const [customError, setCustomError] = useState<string | null>(null);
  const { open } = useAppKit();

  useEffect(() => {
    console.log('NetworkAlert Debug:', {
      targetChainId: Number(CHAIN_ID),
      isConnected,
      switchChain: !!switchChain,
      availableChains: chains?.map(c => ({ id: c.id, name: c.name })),
    });
  }, [switchChain, chains, isConnected]);

  // Don't show the modal if no wallet is connected
  if (!isConnected) {
    return null;
  }
  
  // Don't show if we're already on the correct network
  if (chain && chain.id === Number(CHAIN_ID)) {
    return null;
  }

  const handleSwitch = async () => {
    setCustomError(null);
    try {
      if (!isConnected) {
        setCustomError('No wallet connected. Please connect your wallet first.');
        return;
      }
      if (!switchChain) {
        setCustomError('Switch chain function not available.');
        return;
      }
      
      const targetChainId = Number(CHAIN_ID);
      console.log('Attempting to switch to chain:', targetChainId);
      
      // Check if the chain is already configured in wagmi
      const isChainConfigured = chains?.some(c => c.id === targetChainId);
      
      if (isChainConfigured) {
        // Chain is already configured, just switch to it
        await switchChain({ chainId: targetChainId });
      } else {
        // For custom chains, we need to add them first
        if (targetChainId === 31337) {
          try {
            await (window as any).ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x7a69', // 31337 in hex
                chainName: 'Hardhat Local',
                nativeCurrency: {
                  name: 'Ether',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['http://localhost:8545'],
              }],
            });
            // After adding, try to switch
            await switchChain({ chainId: targetChainId });
          } catch (addError: any) {
            console.error('Failed to add/switch to Hardhat chain:', addError);
            throw addError;
          }
        } else if (targetChainId === 84532) {
          try {
            await (window as any).ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x14a34', // 84532 in hex
                chainName: 'Base Sepolia',
                nativeCurrency: {
                  name: 'Ether',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://sepolia.base.org'],
                blockExplorerUrls: ['https://sepolia.basescan.org'],
              }],
            });
            // After adding, try to switch
            await switchChain({ chainId: targetChainId });
          } catch (addError: any) {
            console.error('Failed to add/switch to Base Sepolia chain:', addError);
            throw addError;
          }
        } else if (targetChainId === 8453) {
          try {
            await (window as any).ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x2105', // 8453 in hex
                chainName: 'Base',
                nativeCurrency: {
                  name: 'Ether',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://mainnet.base.org'],
                blockExplorerUrls: ['https://basescan.org'],
              }],
            });
            // After adding, try to switch
            await switchChain({ chainId: targetChainId });
          } catch (addError: any) {
            console.error('Failed to add/switch to Base chain:', addError);
            throw addError;
          }
        }
      }
    } catch (err: any) {
      console.error('Failed to switch network:', err);
      if (err?.name === 'UserRejectedRequestError' || err?.code === 4001) {
        setCustomError('User rejected the request.');
      } else if (err?.code === 4902 || err?.name === 'ChainNotConfiguredError') {
        setCustomError('The requested chain has not been added to your wallet. Please add it manually.');
      } else {
        setCustomError(err?.message || 'Failed to switch network. Please try manually.');
      }
    }
  };

  return (
    <>
      <Modal show={true} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Wrong Network Detected</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            NIJI auctions require you to switch to {networkName()} to be able to participate.
          </p>
          
          <div className="d-grid gap-2 mb-3">
            {!isConnected ? (
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => open()}
              >
                Connect Wallet
              </Button>
            ) : (
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleSwitch}
                disabled={isPending || !switchChain}
              >
                {isPending ? 'Switching...' : `Switch to ${networkName()}`}
              </Button>
            )}
          </div>

          {(customError || switchError) && (
            <div className="alert alert-danger" role="alert">
              {customError || switchError?.message}
            </div>
          )}

          <hr />
          
          <p>
            <b>Or switch manually:</b>
          </p>
          <ol>
            <li>Open your wallet</li>
            <li>Click the network select dropdown</li>
            <li>Click on "{metamaskNetworkName()}"</li>
            {Number(CHAIN_ID) === 31337 && (
              <li className="text-muted">
                Note: For Hardhat, you may need to add the network manually with RPC URL: http://localhost:8545
              </li>
            )}
          </ol>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default NetworkAlert;
