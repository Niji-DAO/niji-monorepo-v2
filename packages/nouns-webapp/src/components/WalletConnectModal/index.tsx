import Modal from '../Modal';
import WalletButton from '../WalletButton';
import { WALLET_TYPE } from '../WalletButton';
import { useConnect } from 'wagmi';
import classes from './WalletConnectModal.module.css';
import { Trans } from '@lingui/macro';

const WalletConnectModal: React.FC<{ onDismiss: () => void }> = props => {
  const { onDismiss } = props;
  const { connectors, connect } = useConnect();

  const wallets = (
    <div className={classes.walletConnectModal}>
      <WalletButton
        onClick={() => {
          const metamaskConnector = connectors.find(c => c.id === 'metaMask' || c.id === 'injected');
          if (metamaskConnector) {
            connect({ connector: metamaskConnector });
          }
        }}
        walletType={WALLET_TYPE.metamask}
      />
      <WalletButton
        onClick={() => {
          const wcConnector = connectors.find(c => c.id === 'walletConnect');
          if (wcConnector) {
            connect({ connector: wcConnector });
          }
        }}
        walletType={WALLET_TYPE.walletconnect}
      />
      <WalletButton
        onClick={() => {
          const braveConnector = connectors.find(c => c.id === 'metaMask' || c.id === 'injected');
          if (braveConnector) {
            connect({ connector: braveConnector });
          }
        }}
        walletType={WALLET_TYPE.brave}
      />
    </div>
  );
  return (
    <Modal title={<Trans>Connect your wallet</Trans>} content={wallets} onDismiss={onDismiss} />
  );
};
export default WalletConnectModal;
