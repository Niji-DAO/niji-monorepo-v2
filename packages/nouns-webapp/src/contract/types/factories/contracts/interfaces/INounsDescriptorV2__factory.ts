/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  INounsDescriptorV2,
  INounsDescriptorV2Interface,
} from "../../../contracts/interfaces/INounsDescriptorV2";

const _abi = [
  {
    inputs: [],
    name: "BadPaletteLength",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptyPalette",
    type: "error",
  },
  {
    inputs: [],
    name: "IndexNotFound",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract INounsArt",
        name: "art",
        type: "address",
      },
    ],
    name: "ArtUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "baseURI",
        type: "string",
      },
    ],
    name: "BaseURIUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "DataURIToggled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "PartsLocked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract ISVGRenderer",
        name: "renderer",
        type: "address",
      },
    ],
    name: "RendererUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedCompressed",
        type: "bytes",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addBackDecorations",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pointer",
        type: "address",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addBackDecorationsFromPointer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "background",
        type: "string",
      },
    ],
    name: "addBackground",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedCompressed",
        type: "bytes",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addBackgroundDecorations",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pointer",
        type: "address",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addBackgroundDecorationsFromPointer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedCompressed",
        type: "bytes",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addBacks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pointer",
        type: "address",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addBacksFromPointer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedCompressed",
        type: "bytes",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addChokers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pointer",
        type: "address",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addChokersFromPointer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedCompressed",
        type: "bytes",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addClothes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pointer",
        type: "address",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addClothesFromPointer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedCompressed",
        type: "bytes",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addEars",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pointer",
        type: "address",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addEarsFromPointer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedCompressed",
        type: "bytes",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addHairs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pointer",
        type: "address",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addHairsFromPointer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedCompressed",
        type: "bytes",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addHats",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pointer",
        type: "address",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addHatsFromPointer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedCompressed",
        type: "bytes",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addHeadphones",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pointer",
        type: "address",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addHeadphonesFromPointer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedCompressed",
        type: "bytes",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addLeftHands",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pointer",
        type: "address",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addLeftHandsFromPointer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "backgrounds",
        type: "string[]",
      },
    ],
    name: "addManyBackgrounds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedCompressed",
        type: "bytes",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addSpecials",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pointer",
        type: "address",
      },
      {
        internalType: "uint80",
        name: "decompressedLength",
        type: "uint80",
      },
      {
        internalType: "uint16",
        name: "imageCount",
        type: "uint16",
      },
    ],
    name: "addSpecialsFromPointer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "arePartsLocked",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
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
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "backDecorations",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
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
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "backgroundDecorations",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "backgrounds",
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
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "backs",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "chokers",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
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
        name: "index",
        type: "uint256",
      },
    ],
    name: "clothes",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
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
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "ears",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
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
    name: "generateSVGImage",
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
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
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
    name: "genericDataURI",
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
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "hairs",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
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
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "hats",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
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
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "headphones",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isDataURIEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "leftHands",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lockParts",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "paletteIndex",
        type: "uint8",
      },
    ],
    name: "palettes",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "baseURI",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "paletteIndex",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "palette",
        type: "bytes",
      },
    ],
    name: "setPalette",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "paletteIndex",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "pointer",
        type: "address",
      },
    ],
    name: "setPalettePointer",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "index",
        type: "uint256",
      },
    ],
    name: "specials",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "toggleDataURIEnabled",
    outputs: [],
    stateMutability: "nonpayable",
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

export class INounsDescriptorV2__factory {
  static readonly abi = _abi;
  static createInterface(): INounsDescriptorV2Interface {
    return new utils.Interface(_abi) as INounsDescriptorV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): INounsDescriptorV2 {
    return new Contract(address, _abi, signerOrProvider) as INounsDescriptorV2;
  }
}
