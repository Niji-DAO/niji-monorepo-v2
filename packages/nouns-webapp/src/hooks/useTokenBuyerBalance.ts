import { useBalance, useReadContract } from 'wagmi';
import { BigNumber } from 'ethers';
import config from '../config';
import { chainlinkAggregatorV3InterfaceABI } from '../abis/chainlinkAggregatorV3Interface';

const { addresses } = config;

function useTokenBuyerBalance(): BigNumber | undefined {
  const { data: ethBalance } = useBalance({
    address: addresses.tokenBuyer as `0x${string}`,
  });

  const { data: usdcBalance } = useBalance({
    address: addresses.payerContract as `0x${string}`,
    token: addresses.usdcToken as `0x${string}`,
  });

  const { data: ethUsdcPriceData } = useReadContract({
    address: addresses.chainlinkEthUsdc as `0x${string}`,
    abi: chainlinkAggregatorV3InterfaceABI,
    functionName: 'latestRoundData',
    args: [],
  });

  const ethUsdcPrice = ethUsdcPriceData ? BigNumber.from(ethUsdcPriceData[1]) : undefined;

  if (!ethUsdcPrice) {
    return ethBalance ? BigNumber.from(ethBalance.value) : undefined;
  }

  const ethBalanceBN = ethBalance ? BigNumber.from(ethBalance.value) : BigNumber.from(0);
  const usdcBalanceBN = usdcBalance ? BigNumber.from(usdcBalance.value) : BigNumber.from(0);

  return ethBalanceBN.add(usdcBalanceBN.mul(BigNumber.from(10).pow(20)).div(ethUsdcPrice));
}

export default useTokenBuyerBalance;