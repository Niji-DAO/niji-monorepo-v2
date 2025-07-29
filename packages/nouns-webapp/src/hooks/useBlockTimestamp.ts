import { useBlock } from 'wagmi';

/**
 * A function that takes a block number from the chain and returns the timestamp of when the block occurred.
 * @param blockNumber target block number to retrieve the timestamp for
 * @returns unix timestamp of block number
 */
export function useBlockTimestamp(blockNumber: bigint | undefined): number | undefined {
  const { data: block } = useBlock({ blockNumber: blockNumber });
  return block ? Number(block.timestamp) : undefined;
}
