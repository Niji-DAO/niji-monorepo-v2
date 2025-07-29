import { useReadContract } from 'wagmi';
import tokenBuyerABI from './tokenBuyerABI.json';
import { BigNumber as EthersBN } from 'ethers';

const abi = tokenBuyerABI;
const BUFFER_BPS = 5_000;

export const useEthNeeded = (address: string, additionalTokens: number) => {
  const { data: ethNeeded } = useReadContract({
    abi,
    address: address as `0x${string}`,
    functionName: 'ethNeeded',
    args: [additionalTokens, BUFFER_BPS],
  });

  return ethNeeded?.toString();
};
