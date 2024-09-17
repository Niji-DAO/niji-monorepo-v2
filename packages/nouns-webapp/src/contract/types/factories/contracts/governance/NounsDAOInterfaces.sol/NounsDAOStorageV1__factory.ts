/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  NounsDAOStorageV1,
  NounsDAOStorageV1Interface,
} from "../../../../contracts/governance/NounsDAOInterfaces.sol/NounsDAOStorageV1";

const _abi = [
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "latestProposalIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nouns",
    outputs: [
      {
        internalType: "contract NounsTokenLike",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingAdmin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proposalCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proposalThresholdBPS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposals",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "proposer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "proposalThreshold",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "quorumVotes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "forVotes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "againstVotes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "abstainVotes",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "canceled",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "vetoed",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "executed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "quorumVotesBPS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "timelock",
    outputs: [
      {
        internalType: "contract INounsDAOExecutor",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vetoer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "votingDelay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "votingPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608080604052346100165761036e908161001c8239f35b600080fdfe60806040818152600436101561001457600080fd5b600091823560e01c908163013cf08b146102785750806302a251a31461025a57806314a67ea41461023c57806317977c61146101fd57806326782247146101d55780632de45f18146101ad5780633932abb11461018f5780635c60da1b1461016757806383cce0e114610149578063d33219b414610121578063d8bff440146100f9578063da35c664146100db5763f851a440146100b157600080fd5b346100d757816003193601126100d757905490516001600160a01b039091168152602090f35b5080fd5b50346100d757816003193601126100d7576020906008549051908152f35b50346100d757816003193601126100d75760035490516001600160a01b039091168152602090f35b50346100d757816003193601126100d75760095490516001600160a01b039091168152602090f35b50346100d757816003193601126100d7576020906007549051908152f35b50346100d757816003193601126100d75760025490516001600160a01b039091168152602090f35b50346100d757816003193601126100d7576020906004549051908152f35b50346100d757816003193601126100d757600a5490516001600160a01b039091168152602090f35b50346100d757816003193601126100d75760015490516001600160a01b039091168152602090f35b50346100d75760203660031901126100d7576004356001600160a01b038116908190036102385782829160209452600c845220549051908152f35b8280fd5b50346100d757816003193601126100d7576020906006549051908152f35b50346100d757816003193601126100d7576020906005549051908152f35b91905034610238576020366003190112610238578060ff916101a0946004358152600b6020522080549160018060a01b0360018301541690600283015460038401546004850154600986015491600a87015493600b88015495600c89015497600e600d8b01549a01549a8d5260208d01528b015260608a0152608089015260a088015260c087015260e08601526101008501526101208401528181161515610140840152818160081c16151561016084015260101c161515610180820152f3fea26469706673582212209fc429bf47ae25d052de6f226b79f2e0a762a1b125c1a4046123a2a4df1c812d64736f6c63430008140033";

type NounsDAOStorageV1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NounsDAOStorageV1ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NounsDAOStorageV1__factory extends ContractFactory {
  constructor(...args: NounsDAOStorageV1ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NounsDAOStorageV1> {
    return super.deploy(overrides || {}) as Promise<NounsDAOStorageV1>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): NounsDAOStorageV1 {
    return super.attach(address) as NounsDAOStorageV1;
  }
  override connect(signer: Signer): NounsDAOStorageV1__factory {
    return super.connect(signer) as NounsDAOStorageV1__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NounsDAOStorageV1Interface {
    return new utils.Interface(_abi) as NounsDAOStorageV1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NounsDAOStorageV1 {
    return new Contract(address, _abi, signerOrProvider) as NounsDAOStorageV1;
  }
}
