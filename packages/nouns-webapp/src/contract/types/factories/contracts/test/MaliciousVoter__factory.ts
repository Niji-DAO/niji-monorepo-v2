/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  MaliciousVoter,
  MaliciousVoterInterface,
} from "../../../contracts/test/MaliciousVoter";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract NounsDAOLogicV2",
        name: "dao_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "proposalId_",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "support_",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "useReason_",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "castVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "dao",
    outputs: [
      {
        internalType: "contract NounsDAOLogicV2",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proposalId",
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
    name: "support",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x6080346100b057601f6102fe38819003918201601f19168301916001600160401b038311848410176100b5578084926080946040528339810103126100b05780516001600160a01b03811691908290036100b057602081015160408201519160ff83168093036100b05760600151928315158094036100b05760018060a01b0319600054161760005560015561ff006002549260081b169161ffff1916171760025560405161023290816100cc8239f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe60806040526004361015610023575b361561001957600080fd5b610021610109565b005b6000803560e01c80630fb524ce146100c3578063119f8747146100a25780632dfca4451461008457634162169f1461005b575061000e565b34610081578060031936011261008157546040516001600160a01b039091168152602090f35b80fd5b50346100815780600319360112610081576020600154604051908152f35b5034610081578060031936011261008157602060ff60025416604051908152f35b50346100815780600319360112610081576100dc610109565b80f35b67ffffffffffffffff81116100f357604052565b634e487b7160e01b600052604160045260246000fd5b60025460ff8160081c166000146101a95750600060018060a01b038154169060015460ff6002541690833b156101a5579060a483928360405196879485936364c0599560e01b85526004850152602484015260606044840152600b60648401526a39b7b6b2903932b0b9b7b760a91b60848401525af1908115610199575061018e5750565b610197906100df565b565b604051903d90823e3d90fd5b8280fd5b60008054600154929392906001600160a01b0316803b156101a55793604483928360ff9697604051978895869463227d647b60e11b865260048601521660248401525af1908115610199575061018e575056fea2646970667358221220051ef13e8c46f4893d277933b605ffa259bc8a38f5f0e18d8cb0a98f7cfe52d564736f6c63430008140033";

type MaliciousVoterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MaliciousVoterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MaliciousVoter__factory extends ContractFactory {
  constructor(...args: MaliciousVoterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    dao_: PromiseOrValue<string>,
    proposalId_: PromiseOrValue<BigNumberish>,
    support_: PromiseOrValue<BigNumberish>,
    useReason_: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MaliciousVoter> {
    return super.deploy(
      dao_,
      proposalId_,
      support_,
      useReason_,
      overrides || {}
    ) as Promise<MaliciousVoter>;
  }
  override getDeployTransaction(
    dao_: PromiseOrValue<string>,
    proposalId_: PromiseOrValue<BigNumberish>,
    support_: PromiseOrValue<BigNumberish>,
    useReason_: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      dao_,
      proposalId_,
      support_,
      useReason_,
      overrides || {}
    );
  }
  override attach(address: string): MaliciousVoter {
    return super.attach(address) as MaliciousVoter;
  }
  override connect(signer: Signer): MaliciousVoter__factory {
    return super.connect(signer) as MaliciousVoter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MaliciousVoterInterface {
    return new utils.Interface(_abi) as MaliciousVoterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MaliciousVoter {
    return new Contract(address, _abi, signerOrProvider) as MaliciousVoter;
  }
}
