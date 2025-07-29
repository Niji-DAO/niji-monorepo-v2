import { usePublicClient } from 'wagmi';

/**
 * Returns a provider that's constructed using the readonly RPC URL.
 */
export function useReadonlyProvider() {
  return usePublicClient();
}
