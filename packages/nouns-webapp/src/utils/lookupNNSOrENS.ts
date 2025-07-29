import { PublicClient } from 'viem';
import { decodeAbiParameters, parseAbiParameters } from 'viem';

/**
 * Look up either NNS or ENS (using NNS contract to resolve NNS with ENS fallback)
 * @param client PublicClient
 * @param address  Address to resolve
 * @returns  NNS or ENS or null (if neither resolve)
 */
export async function lookupNNSOrENS(
  client: PublicClient,
  address: string,
): Promise<string | null> {
  try {
    // Call resolver contract
    const res = await client.call({
      to: '0x5982ce3554b18a5cf02169049e81ec43bfb73961', // see https://etherscan.io/address/0x5982cE3554B18a5CF02169049e81ec43BFB73961
      data: ('0x55ea6c47000000000000000000000000' + address.substring(2)) as `0x${string}`, // call .resolve(address) method
    });

    if (!res.data) {
      return null;
    }

    const decoded = decodeAbiParameters(
      parseAbiParameters('string'),
      res.data
    );

    return decoded[0] || null;
  } catch (e) {
    return null;
  }
}
