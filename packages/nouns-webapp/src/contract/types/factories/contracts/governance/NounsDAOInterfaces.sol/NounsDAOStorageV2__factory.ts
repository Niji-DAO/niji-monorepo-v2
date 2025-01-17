/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  NounsDAOStorageV2,
  NounsDAOStorageV2Interface,
} from "../../../../contracts/governance/NounsDAOInterfaces.sol/NounsDAOStorageV2";

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
    name: "pendingVetoer",
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
    name: "quorumParamsCheckpoints",
    outputs: [
      {
        internalType: "uint32",
        name: "fromBlock",
        type: "uint32",
      },
      {
        components: [
          {
            internalType: "uint16",
            name: "minQuorumVotesBPS",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "maxQuorumVotesBPS",
            type: "uint16",
          },
          {
            internalType: "uint32",
            name: "quorumCoefficient",
            type: "uint32",
          },
        ],
        internalType: "struct NounsDAOStorageV2.DynamicQuorumParams",
        name: "params",
        type: "tuple",
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
  "0x60808060405234610016576103ca908161001c8239f35b600080fdfe60806040818152600436101561001457600080fd5b600091823560e01c90816302a251a3146103785750806314a67ea41461035a57806317977c611461031f57806326782247146102f75780632de45f18146102cf5780633932abb1146102b15780635c60da1b1461028957806383cce0e11461026b578063a67d063514610243578063abb308b214610154578063d33219b41461012c578063d8bff44014610104578063da35c664146100e65763f851a440146100bc57600080fd5b346100e257816003193601126100e257905490516001600160a01b039091168152602090f35b5080fd5b50346100e257816003193601126100e2576020906008549051908152f35b50346100e257816003193601126100e25760035490516001600160a01b039091168152602090f35b50346100e257816003193601126100e25760095490516001600160a01b039091168152602090f35b50346100e25760203660031901126100e257600435600d5481101561023f57600d835260011b9163ffffffff9081847fd7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb501541692805191606083019083821067ffffffffffffffff83111761022b57506080957fd7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb691835201549161ffff908184168152816020820191818660101c168352868582019660201c16865284519788525116602087015251169084015251166060820152f35b634e487b7160e01b81526041600452602490fd5b8280fd5b50346100e257816003193601126100e257600e5490516001600160a01b039091168152602090f35b50346100e257816003193601126100e2576020906007549051908152f35b50346100e257816003193601126100e25760025490516001600160a01b039091168152602090f35b50346100e257816003193601126100e2576020906004549051908152f35b50346100e257816003193601126100e257600a5490516001600160a01b039091168152602090f35b50346100e257816003193601126100e25760015490516001600160a01b039091168152602090f35b50346100e25760203660031901126100e2576004356001600160a01b0381169081900361023f5782829160209452600c845220549051908152f35b50346100e257816003193601126100e2576020906006549051908152f35b8390346100e257816003193601126100e2576020906005548152f3fea26469706673582212205a93f20190d272bebc3bb38d596ddaf43165906dd301662977360a52328d2ffc64736f6c63430008140033";

type NounsDAOStorageV2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NounsDAOStorageV2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NounsDAOStorageV2__factory extends ContractFactory {
  constructor(...args: NounsDAOStorageV2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NounsDAOStorageV2> {
    return super.deploy(overrides || {}) as Promise<NounsDAOStorageV2>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): NounsDAOStorageV2 {
    return super.attach(address) as NounsDAOStorageV2;
  }
  override connect(signer: Signer): NounsDAOStorageV2__factory {
    return super.connect(signer) as NounsDAOStorageV2__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NounsDAOStorageV2Interface {
    return new utils.Interface(_abi) as NounsDAOStorageV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NounsDAOStorageV2 {
    return new Contract(address, _abi, signerOrProvider) as NounsDAOStorageV2;
  }
}
