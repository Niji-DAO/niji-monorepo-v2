import { useBalance } from 'wagmi';
import { BigNumber } from 'ethers';
import config from '../config';

const { addresses } = config;

function useLidoBalance(): BigNumber | undefined {
  const { data: balance } = useBalance({
    address: addresses.nounsDaoExecutor as `0x${string}`,
    token: addresses.lidoToken as `0x${string}`,
  });

  return balance ? BigNumber.from(balance.value) : undefined;
}

export default useLidoBalance;
