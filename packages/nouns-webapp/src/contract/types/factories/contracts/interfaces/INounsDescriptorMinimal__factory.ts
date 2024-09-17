/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  INounsDescriptorMinimal,
  INounsDescriptorMinimalInterface,
} from "../../../contracts/interfaces/INounsDescriptorMinimal";

const _abi = [
  {
    inputs: [],
    name: "backCount",
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
    name: "backDecorationCount",
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
    name: "backgroundCount",
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
    name: "backgroundDecorationCount",
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
    name: "chokerCount",
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
    name: "clotheCount",
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
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint48",
            name: "background",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "backDecoration",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "backgroundDecoration",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "special",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "leftHand",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "back",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "clothe",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "choker",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "ear",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "hair",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "hat",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "headphone",
            type: "uint48",
          },
        ],
        internalType: "struct INounsSeeder.Seed",
        name: "seed",
        type: "tuple",
      },
    ],
    name: "dataURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "earCount",
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
    name: "hairCount",
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
    name: "hatCount",
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
    name: "headphoneCount",
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
    name: "leftHandCount",
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
    name: "specialCount",
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
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint48",
            name: "background",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "backDecoration",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "backgroundDecoration",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "special",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "leftHand",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "back",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "clothe",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "choker",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "ear",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "hair",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "hat",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "headphone",
            type: "uint48",
          },
        ],
        internalType: "struct INounsSeeder.Seed",
        name: "seed",
        type: "tuple",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class INounsDescriptorMinimal__factory {
  static readonly abi = _abi;
  static createInterface(): INounsDescriptorMinimalInterface {
    return new utils.Interface(_abi) as INounsDescriptorMinimalInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): INounsDescriptorMinimal {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as INounsDescriptorMinimal;
  }
}
