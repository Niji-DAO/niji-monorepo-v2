import { useBalance, useReadContract } from 'wagmi';
import { useConfig } from 'wagmi';
import { useEffect, useState } from 'react';
import useLidoBalance from './useLidoBalance';
import useTokenBuyerBalance from './useTokenBuyerBalance';
import config from '../config';
import { BigNumber, ethers } from 'ethers';
import { chainlinkAggregatorV3InterfaceABI } from '../abis/chainlinkAggregatorV3Interface';

/**
 * Computes treasury balance (ETH + Lido)
 *
 * @returns Total balance of treasury (ETH + Lido) as EthersBN
 */
export const useTreasuryBalance = () => {
  const { data: ethBalance } = useBalance({ address: config.addresses.nounsDaoExecutor as `0x${string}` });
  const lidoBalanceAsETH = useLidoBalance();
  const tokenBuyerBalanceAsETH = useTokenBuyerBalance();

  const zero = BigNumber.from(0);
  return ethBalance?.value ? BigNumber.from(ethBalance.value).add(lidoBalanceAsETH ?? zero).add(tokenBuyerBalanceAsETH ?? zero) : zero;
};

export const useEthUsdPrice = () => {
  const { data: price } = useReadContract({
    address: config.addresses.chainlinkEthUsdc as `0x${string}`,
    abi: chainlinkAggregatorV3InterfaceABI,
    functionName: 'latestRoundData',
  });
  return price;
};

/**
 * Computes treasury usd value of treasury assets (ETH + Lido) at current ETH-USD exchange rate
 *
 * @returns USD value of treasury assets (ETH + Lido) at current exchange rate
 */
export const useTreasuryUSDValue = () => {
  const priceData = useEthUsdPrice();
  const etherPrice = priceData ? Number(priceData[1]) / 1e8 : 0;
  const treasuryBalanceETH = Number(
    ethers.utils.formatEther(useTreasuryBalance()?.toString() || '0'),
  );
  return etherPrice * treasuryBalanceETH;
};