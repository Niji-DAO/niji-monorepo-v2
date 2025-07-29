import { useQuery } from '@apollo/client';
import { NounsDAOV2ABI } from '@nouns/sdk';
import {
  useAccount,
  useBlockNumber,
  useReadContract,
  useReadContracts,
  useWriteContract,
} from 'wagmi';
import { decodeEventLog } from 'viem';
import BigNumber from 'bignumber.js';
import { ethers, BigNumber as EthersBN, utils } from 'ethers';
import { defaultAbiCoder, Result } from 'ethers/lib/utils';
import * as R from 'ramda';
import { useMemo } from 'react';
import config, { CHAIN_ID } from '../config';
import { useBlockTimestamp } from '../hooks/useBlockTimestamp';
import { useLogs } from '../hooks/useLogs';
import { partialProposalsQuery, proposalQuery } from './subgraph';
import { mainnet } from 'wagmi/chains';

const abi = NounsDAOV2ABI;
const nounsDaoContract = new ethers.Contract(
  config.addresses.nounsDAOProxy,
  NounsDAOV2ABI,
  ethers.providers.getDefaultProvider(),
);

export interface DynamicQuorumParams {
  minQuorumVotesBPS: number;
  maxQuorumVotesBPS: number;
  quorumCoefficient: number;
}

export enum Vote {
  AGAINST = 0,
  FOR = 1,
  ABSTAIN = 2,
}

export enum ProposalState {
  UNDETERMINED = -1,
  PENDING,
  ACTIVE,
  CANCELLED,
  DEFEATED,
  SUCCEEDED,
  QUEUED,
  EXPIRED,
  EXECUTED,
  VETOED,
}

interface ProposalCallResult {
  id: EthersBN;
  abstainVotes: EthersBN;
  againstVotes: EthersBN;
  forVotes: EthersBN;
  canceled: boolean;
  vetoed: boolean;
  executed: boolean;
  startBlock: EthersBN;
  endBlock: EthersBN;
  eta: EthersBN;
  proposalThreshold: EthersBN;
  proposer: string;
  quorumVotes: EthersBN;
}

interface ProposalDetail {
  target: string;
  value?: string;
  functionSig: string;
  callData: string;
}

export interface PartialProposal {
  id: string | undefined;
  title: string;
  status: ProposalState;
  forCount: number;
  againstCount: number;
  abstainCount: number;
  startBlock: number;
  endBlock: number;
  eta: Date | undefined;
  quorumVotes: number;
}

export interface Proposal extends PartialProposal {
  description: string;
  createdBlock: number;
  proposer: string | undefined;
  proposalThreshold: number;
  details: ProposalDetail[];
  transactionHash: string;
}

interface ProposalTransactionDetails {
  targets: string[];
  values: string[];
  signatures: string[];
  calldatas: string[];
}

export interface PartialProposalSubgraphEntity {
  id: string;
  title: string;
  status: keyof typeof ProposalState;
  forVotes: string;
  againstVotes: string;
  abstainVotes: string;
  startBlock: string;
  endBlock: string;
  executionETA: string | null;
  quorumVotes: string;
}

export interface ProposalSubgraphEntity
  extends ProposalTransactionDetails,
    PartialProposalSubgraphEntity {
  description: string;
  createdBlock: string;
  createdTransactionHash: string;
  proposer: { id: string };
  proposalThreshold: string;
}

interface PartialProposalData {
  data: PartialProposal[];
  error?: Error;
  loading: boolean;
}

export interface ProposalTransaction {
  address: string;
  value: string;
  signature: string;
  calldata: string;
  decodedCalldata?: string;
  usdcValue?: number;
}

// Start the log search at the mainnet deployment block to speed up log queries
const fromBlock = CHAIN_ID === mainnet.id ? 12985453 : 0;
const proposalCreatedFilter = {
  ...nounsDaoContract.filters?.ProposalCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ),
  fromBlock,
};

const hashRegex = /^\s*#{1,6}\s+([^\n]+)/;
const equalTitleRegex = /^\s*([^\n]+)\n(={3,25}|-{3,25})/

/**
 * Extract a markdown title from a proposal body that uses the `# Title` format
 * Returns null if no title found.
 */
const extractHashTitle = (body: string) => body.match(hashRegex);
/**
 * Extract a markdown title from a proposal body that uses the `Title\n===` format.
 * Returns null if no title found.
 */
const extractEqualTitle = (body: string) => body.match(equalTitleRegex);

/**
 * Extract title from a proposal's body/description. Returns null if no title found in the first line.
 * @param body proposal body
 */
const extractTitle = (body: string | undefined): string | null => {
  if (!body) return null;
  const hashResult = extractHashTitle(body);
  const equalResult = extractEqualTitle(body);
  return hashResult ? hashResult[1] : equalResult ? equalResult[1] : null;
};

const removeBold = (text: string | null): string | null =>
  text ? text.replace(/\*\*/g, '') : text;
const removeItalics = (text: string | null): string | null =>
  text ? text.replace(/__/g, '') : text;

const removeMarkdownStyle = R.compose(removeBold, removeItalics);

export const useCurrentQuorum = (
  nounsDao: string,
  proposalId: number,
  skip: boolean = false,
): number | undefined => {
  const { data: quorum } = useReadContract({
    abi,
    address: nounsDao as `0x${string}`,
    functionName: 'quorumVotes',
    args: [proposalId],
    query: { enabled: !skip },
  });
  return quorum ? Number(quorum) : undefined;
};

export const useDynamicQuorumProps = (
  nounsDao: string,
  block: number,
): DynamicQuorumParams | undefined => {
  const { data: params } = useReadContract({
    abi,
    address: nounsDao as `0x${string}`,
    functionName: 'getDynamicQuorumParamsAt',
    args: [block],
  });

  return params as DynamicQuorumParams | undefined;
};

export const useHasVotedOnProposal = (proposalId: string | undefined): boolean => {
  const { address } = useAccount();

  const { data: receipt } = useReadContract({
    abi,
    address: nounsDaoContract.address as `0x${string}`,
    functionName: 'getReceipt',
    args: [proposalId, address],
  });
  return (receipt as any)?.hasVoted ?? false;
};

export const useProposalVote = (proposalId: string | undefined): string => {
  const { address } = useAccount();

  const { data: receipt } = useReadContract({
    abi,
    address: nounsDaoContract.address as `0x${string}`,
    functionName: 'getReceipt',
    args: [proposalId, address],
  });
  const voteStatus = (receipt as any)?.support ?? -1;
  if (voteStatus === 0) {
    return 'Against';
  }
  if (voteStatus === 1) {
    return 'For';
  }
  if (voteStatus === 2) {
    return 'Abstain';
  }

  return '';
};

export const useProposalCount = (): number | undefined => {
  const { data: count } = useReadContract({
    abi,
    address: nounsDaoContract.address as `0x${string}`,
    functionName: 'proposalCount',
    args: [],
  });
  return count ? Number(count) : undefined;
};

export const useProposalThreshold = (): number | undefined => {
  const { data: count } = useReadContract({
    abi,
    address: nounsDaoContract.address as `0x${string}`,
    functionName: 'proposalThreshold',
    args: [],
  });
  return count ? Number(count) : undefined;
};

const countToIndices = (count: number | undefined) => {
  return typeof count === 'number' ? new Array(count).fill(0).map((_, i) => [i + 1]) : [];
};

const formatProposalTransactionDetails = (details: ProposalTransactionDetails | Result) => {
  return details.targets.map((target: string, i: number) => {
    const signature: string = details.signatures[i];
    const value = EthersBN.from(
      // Handle both logs and subgraph responses
      (details as ProposalTransactionDetails).values?.[i] ?? (details as Result)?.[3]?.[i] ?? 0,
    );
    // Split at first occurrence of '('
    let [name, types] = signature.substring(0, signature.length - 1)?.split(/\((.*)/s);
    if (!name || !types) {
      return {
        target,
        functionSig: name === '' ? 'transfer' : name === undefined ? 'unknown' : name,
        callData: types ? types : value ? `${utils.formatEther(value)} ETH` : '',
      };
    }
    const calldata = details.calldatas[i];
    // Split using comma as separator, unless comma is between parentheses (tuple).
    const decoded = defaultAbiCoder.decode(types.split(/,(?![^(]*\))/g), calldata);
    return {
      target,
      functionSig: name,
      callData: decoded.join(),
      value: value.gt(0) ? `{ value: ${utils.formatEther(value)} ETH }` : '',
    };
  });
};

const useFormattedProposalCreatedLogs = (skip: boolean, fromBlock?: number) => {
  const filter = useMemo(
    () => ({
      ...proposalCreatedFilter,
      ...(fromBlock ? { fromBlock } : {}),
    }),
    [fromBlock],
  );
  const useLogsResult = useLogs(!skip ? filter : undefined);

  return useMemo(() => {
    return useLogsResult?.logs?.map(log => {
      const { args: parsed } = decodeEventLog({
        abi,
        data: log.data as `0x${string}`,
        topics: log.topics as [signature: `0x${string}`, ...args: `0x${string}`[]],
      });
      return {
        description: (parsed as any)?.description,
        transactionHash: log.transactionHash,
        details: formatProposalTransactionDetails(parsed as any),
      };
    });
  }, [useLogsResult]);
};

const getProposalState = (
  blockNumber: bigint | undefined,
  blockTimestamp: Date | undefined,
  proposal: PartialProposalSubgraphEntity,
) => {
  let status = ProposalState[proposal.status];
  if (status === ProposalState.PENDING) {
    if (!blockNumber) {
      return ProposalState.UNDETERMINED;
    }
    if (blockNumber <= BigInt(proposal.startBlock)) {
      return ProposalState.PENDING;
    }
    status = ProposalState.ACTIVE;
  }
  if (status === ProposalState.ACTIVE) {
    if (!blockNumber) {
      return ProposalState.UNDETERMINED;
    }
    if (blockNumber > BigInt(proposal.endBlock)) {
      const forVotes = new BigNumber(proposal.forVotes);
      if (forVotes.lte(proposal.againstVotes) || forVotes.lt(proposal.quorumVotes)) {
        return ProposalState.DEFEATED;
      }
      if (!proposal.executionETA) {
        return ProposalState.SUCCEEDED;
      }
    }
    return status;
  }
  if (status === ProposalState.QUEUED) {
    if (!blockTimestamp || !proposal.executionETA) {
      return ProposalState.UNDETERMINED;
    }
    const GRACE_PERIOD = 14 * 60 * 60 * 24;
    if (blockTimestamp.getTime() / 1_000 >= parseInt(proposal.executionETA) + GRACE_PERIOD) {
      return ProposalState.EXPIRED;
    }
    return status;
  }
  return status;
};

const parsePartialSubgraphProposal = (
  proposal: PartialProposalSubgraphEntity | undefined,
  blockNumber: bigint | undefined,
  timestamp: number | undefined,
) => {
  if (!proposal) {
    return;
  }

  return {
    id: proposal.id,
    title: proposal.title ?? 'Untitled',
    status: getProposalState(blockNumber, new Date((timestamp ?? 0) * 1000), proposal),
    startBlock: parseInt(proposal.startBlock),
    endBlock: parseInt(proposal.endBlock),
    forCount: parseInt(proposal.forVotes),
    againstCount: parseInt(proposal.againstVotes),
    abstainCount: parseInt(proposal.abstainVotes),
    quorumVotes: parseInt(proposal.quorumVotes),
    eta: proposal.executionETA ? new Date(Number(proposal.executionETA) * 1000) : undefined,
  };
};

const parseSubgraphProposal = (
  proposal: ProposalSubgraphEntity | undefined,
  blockNumber: bigint | undefined,
  timestamp: number | undefined,
) => {
  if (!proposal) {
    return;
  }

  const description = proposal.description?.replace(/\n/g, '\n').replace(/(^['"]|['"]$)/g, '');
  return {
    id: proposal.id,
    title: R.pipe(extractTitle, removeMarkdownStyle)(description) ?? 'Untitled',
    description: description ?? 'No description.',
    proposer: proposal.proposer?.id,
    status: getProposalState(blockNumber, new Date((timestamp ?? 0) * 1000), proposal),
    proposalThreshold: parseInt(proposal.proposalThreshold),
    quorumVotes: parseInt(proposal.quorumVotes),
    forCount: parseInt(proposal.forVotes),
    againstCount: parseInt(proposal.againstVotes),
    abstainCount: parseInt(proposal.abstainVotes),
    createdBlock: parseInt(proposal.createdBlock),
    startBlock: parseInt(proposal.startBlock),
    endBlock: parseInt(proposal.endBlock),
    eta: proposal.executionETA ? new Date(Number(proposal.executionETA) * 1000) : undefined,
    details: formatProposalTransactionDetails(proposal),
    transactionHash: proposal.createdTransactionHash,
  };
};

export const useAllProposalsViaSubgraph = (): PartialProposalData => {
  const { loading, data, error } = useQuery(partialProposalsQuery());
  const { data: blockNumber } = useBlockNumber();
  const timestamp = useBlockTimestamp(blockNumber);

  const proposals = data?.proposals?.map((proposal: ProposalSubgraphEntity) =>
    parsePartialSubgraphProposal(proposal, blockNumber, timestamp),
  );

  return {
    loading,
    error,
    data: proposals ?? [],
  };
};

export const useAllProposalsViaChain = (skip = false): PartialProposalData => {
  const proposalCount = useProposalCount();

  const govProposalIndexes = useMemo(() => {
    return countToIndices(proposalCount);
  }, [proposalCount]);

  const requests = (method: string) => {
    if (skip) return [];
    return govProposalIndexes.map(index => ({
      abi,
      functionName: method,
      address: nounsDaoContract.address as `0x${string}`,
      args: [index],
    }));
  };

  const { data: proposals } = useReadContracts<any>({ contracts: requests('proposals') });
  const { data: proposalStates } = useReadContracts<any>({ contracts: requests('state') });

  const formattedLogs = useFormattedProposalCreatedLogs(skip);

  // Early return until events are fetched
  return useMemo(() => {
    const logs = formattedLogs ?? [];
    if (proposals?.length && !logs.length) {
      return { data: [], loading: true };
    }

    return {
      data: proposals?.map((p, i) => {
        const proposal = p?.result as ProposalCallResult;
        const description = logs[i]?.description?.replace(/\n/g, '\n');
        return {
          id: proposal?.id.toString(),
          title: R.pipe(extractTitle, removeMarkdownStyle)(description) ?? 'Untitled',
          status: proposalStates?.[i]?.result as ProposalState ?? ProposalState.UNDETERMINED,

          startBlock: parseInt(proposal?.startBlock?.toString() ?? ''),
          endBlock: parseInt(proposal?.endBlock?.toString() ?? ''),
          forCount: parseInt(proposal?.forVotes?.toString() ?? '0'),
          againstCount: parseInt(proposal?.againstVotes?.toString() ?? '0'),
          abstainCount: parseInt(proposal?.abstainVotes?.toString() ?? '0'),
          quorumVotes: parseInt(proposal?.quorumVotes?.toString() ?? '0'),
          eta: proposal?.eta ? new Date(Number(proposal?.eta) * 1000) : undefined,
        };
      }) ?? [],
      loading: false,
    };
  }, [formattedLogs, proposalStates, proposals]);
};

export const useAllProposals = (): PartialProposalData => {
  const subgraph = useAllProposalsViaSubgraph();
  const onchain = useAllProposalsViaChain(!subgraph.error);
  return subgraph?.error ? onchain : subgraph;
};

export const useProposal = (id: string | number): Proposal | undefined => {
  const { data: blockNumber } = useBlockNumber();
  const timestamp = useBlockTimestamp(blockNumber);
  return parseSubgraphProposal(useQuery(proposalQuery(id)).data?.proposal, blockNumber, timestamp);
};

export const useCastVote = () => {
  const { writeContract, ...state } = useWriteContract();
  return {
    castVote: async (proposalId: string, support: Vote) => {
      writeContract({
        address: config.addresses.nounsDAOProxy as `0x${string}`,
        abi,
        functionName: 'castVote',
        args: [BigInt(proposalId), support],
      });
    },
    castVoteState: state,
  };
};

export const useCastVoteWithReason = () => {
  const { writeContract, ...state } = useWriteContract();
  return {
    castVoteWithReason: async (proposalId: string, support: Vote, reason: string) => {
      writeContract({
        address: config.addresses.nounsDAOProxy as `0x${string}`,
        abi,
        functionName: 'castVoteWithReason',
        args: [BigInt(proposalId), support, reason],
      });
    },
    castVoteWithReasonState: state,
  };
};

export const useCastRefundableVote = () => {
  const { writeContract, ...state } = useWriteContract();

  return {
    castRefundableVote: async (proposalId: string, support: Vote): Promise<void> => {
      writeContract({
        address: config.addresses.nounsDAOProxy as `0x${string}`,
        abi,
        functionName: 'castRefundableVote',
        args: [BigInt(proposalId), support],
      });
    },
    castRefundableVoteState: state,
  };
};

export const useCastRefundableVoteWithReason = () => {
  const { writeContract, ...state } = useWriteContract();

  return {
    castRefundableVoteWithReason: async (
      proposalId: string,
      support: Vote,
      reason: string,
    ): Promise<void> => {
      writeContract({
        address: config.addresses.nounsDAOProxy as `0x${string}`,
        abi,
        functionName: 'castRefundableVoteWithReason',
        args: [BigInt(proposalId), support, reason],
      });
    },
    castRefundableVoteWithReasonState: state,
  };
};

export const usePropose = () => {
  const { writeContract, ...state } = useWriteContract();
  return { propose: writeContract, proposeState: state };
};

export const useQueueProposal = () => {
  const { writeContract, ...state } = useWriteContract();
  return { queueProposal: writeContract, queueProposalState: state };
};

export const useCancelProposal = () => {
  const { writeContract, ...state } = useWriteContract();
  return { cancelProposal: writeContract, cancelProposalState: state };
};

export const useExecuteProposal = () => {
  const { writeContract, ...state } = useWriteContract();
  return { executeProposal: writeContract, executeProposalState: state };
};
