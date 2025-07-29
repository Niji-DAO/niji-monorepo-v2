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
          connect({ connector: connectors.find(c => c.id === 'injected')! });
        }}
        walletType={WALLET_TYPE.metamask}
      />
      <WalletButton
        onClick={() => {
          connect({ connector: connectors.find(c => c.id === 'walletConnect')! });
        }}
        walletType={WALLET_TYPE.walletconnect}
      />
      <WalletButton
        onClick={() => {
          connect({ connector: connectors.find(c => c.id === 'injected')! });
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
