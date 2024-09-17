/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  INounsArt,
  INounsArtInterface,
} from "../../../contracts/interfaces/INounsArt";

const _abi = [
  {
    inputs: [],
    name: "BadDecompressedLength",
    type: "error",
  },
  {
    inputs: [],
    name: "BadImageCount",
    type: "error",
  },
  {
    inputs: [],
    name: "BadPaletteLength",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptyBytes",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptyPalette",
    type: "error",
  },
  {
    inputs: [],
    name: "ImageNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "PaletteNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "SenderIsNotDescriptor",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "count",
        type: "uint16",
      },
    ],
    name: "BackDecorationsAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "count",
        type: "uint16",
      },
    ],
    name: "BackgroundDecorationsAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
    ],
    name: "BackgroundsAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "count",
        type: "uint16",
      },
    ],
    name: "BacksAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "count",
        type: "uint16",
      },
    ],
    name: "ChokersAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "count",
        type: "uint16",
      },
    ],
    name: "ClothesAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldDescriptor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newDescriptor",
        type: "address",
      },
    ],
    name: "DescriptorUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "count",
        type: "uint16",
      },
    ],
    name: "EarsAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "count",
        type: "uint16",
      },
    ],
    name: "HairsAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "count",
        type: "uint16",
      },
    ],
    name: "HatsAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "count",
        type: "uint16",
      },
    ],
    name: "HeadphonesAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldInflator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newInflator",
        type: "address",
      },
    ],
    name: "InflatorUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "count",
        type: "uint16",
      },
    ],
    name: "LeftHandsAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "paletteIndex",
        type: "uint8",
      },
    ],
    name: "PaletteSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "count",
        type: "uint16",
      },
    ],
    name: "SpecialsAdded",
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
        name: "_background",
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
        name: "_backgrounds",
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
    inputs: [],
    name: "descriptor",
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
    inputs: [],
    name: "getBackDecorationsTrait",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint16",
                name: "imageCount",
                type: "uint16",
              },
              {
                internalType: "uint80",
                name: "decompressedLength",
                type: "uint80",
              },
              {
                internalType: "address",
                name: "pointer",
                type: "address",
              },
            ],
            internalType: "struct INounsArt.NounArtStoragePage[]",
            name: "storagePages",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "storedImagesCount",
            type: "uint256",
          },
        ],
        internalType: "struct INounsArt.Trait",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBackgroundDecorationsTrait",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint16",
                name: "imageCount",
                type: "uint16",
              },
              {
                internalType: "uint80",
                name: "decompressedLength",
                type: "uint80",
              },
              {
                internalType: "address",
                name: "pointer",
                type: "address",
              },
            ],
            internalType: "struct INounsArt.NounArtStoragePage[]",
            name: "storagePages",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "storedImagesCount",
            type: "uint256",
          },
        ],
        internalType: "struct INounsArt.Trait",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBacksTrait",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint16",
                name: "imageCount",
                type: "uint16",
              },
              {
                internalType: "uint80",
                name: "decompressedLength",
                type: "uint80",
              },
              {
                internalType: "address",
                name: "pointer",
                type: "address",
              },
            ],
            internalType: "struct INounsArt.NounArtStoragePage[]",
            name: "storagePages",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "storedImagesCount",
            type: "uint256",
          },
        ],
        internalType: "struct INounsArt.Trait",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getChokersTrait",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint16",
                name: "imageCount",
                type: "uint16",
              },
              {
                internalType: "uint80",
                name: "decompressedLength",
                type: "uint80",
              },
              {
                internalType: "address",
                name: "pointer",
                type: "address",
              },
            ],
            internalType: "struct INounsArt.NounArtStoragePage[]",
            name: "storagePages",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "storedImagesCount",
            type: "uint256",
          },
        ],
        internalType: "struct INounsArt.Trait",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getClothesTrait",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint16",
                name: "imageCount",
                type: "uint16",
              },
              {
                internalType: "uint80",
                name: "decompressedLength",
                type: "uint80",
              },
              {
                internalType: "address",
                name: "pointer",
                type: "address",
              },
            ],
            internalType: "struct INounsArt.NounArtStoragePage[]",
            name: "storagePages",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "storedImagesCount",
            type: "uint256",
          },
        ],
        internalType: "struct INounsArt.Trait",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEarsTrait",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint16",
                name: "imageCount",
                type: "uint16",
              },
              {
                internalType: "uint80",
                name: "decompressedLength",
                type: "uint80",
              },
              {
                internalType: "address",
                name: "pointer",
                type: "address",
              },
            ],
            internalType: "struct INounsArt.NounArtStoragePage[]",
            name: "storagePages",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "storedImagesCount",
            type: "uint256",
          },
        ],
        internalType: "struct INounsArt.Trait",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHairsTrait",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint16",
                name: "imageCount",
                type: "uint16",
              },
              {
                internalType: "uint80",
                name: "decompressedLength",
                type: "uint80",
              },
              {
                internalType: "address",
                name: "pointer",
                type: "address",
              },
            ],
            internalType: "struct INounsArt.NounArtStoragePage[]",
            name: "storagePages",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "storedImagesCount",
            type: "uint256",
          },
        ],
        internalType: "struct INounsArt.Trait",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHatsTrait",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint16",
                name: "imageCount",
                type: "uint16",
              },
              {
                internalType: "uint80",
                name: "decompressedLength",
                type: "uint80",
              },
              {
                internalType: "address",
                name: "pointer",
                type: "address",
              },
            ],
            internalType: "struct INounsArt.NounArtStoragePage[]",
            name: "storagePages",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "storedImagesCount",
            type: "uint256",
          },
        ],
        internalType: "struct INounsArt.Trait",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHeadphonesTrait",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint16",
                name: "imageCount",
                type: "uint16",
              },
              {
                internalType: "uint80",
                name: "decompressedLength",
                type: "uint80",
              },
              {
                internalType: "address",
                name: "pointer",
                type: "address",
              },
            ],
            internalType: "struct INounsArt.NounArtStoragePage[]",
            name: "storagePages",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "storedImagesCount",
            type: "uint256",
          },
        ],
        internalType: "struct INounsArt.Trait",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLeftHandsTrait",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint16",
                name: "imageCount",
                type: "uint16",
              },
              {
                internalType: "uint80",
                name: "decompressedLength",
                type: "uint80",
              },
              {
                internalType: "address",
                name: "pointer",
                type: "address",
              },
            ],
            internalType: "struct INounsArt.NounArtStoragePage[]",
            name: "storagePages",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "storedImagesCount",
            type: "uint256",
          },
        ],
        internalType: "struct INounsArt.Trait",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSpecialsTrait",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint16",
                name: "imageCount",
                type: "uint16",
              },
              {
                internalType: "uint80",
                name: "decompressedLength",
                type: "uint80",
              },
              {
                internalType: "address",
                name: "pointer",
                type: "address",
              },
            ],
            internalType: "struct INounsArt.NounArtStoragePage[]",
            name: "storagePages",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "storedImagesCount",
            type: "uint256",
          },
        ],
        internalType: "struct INounsArt.Trait",
        name: "",
        type: "tuple",
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
    name: "inflator",
    outputs: [
      {
        internalType: "contract IInflator",
        name: "",
        type: "address",
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
        internalType: "address",
        name: "descriptor",
        type: "address",
      },
    ],
    name: "setDescriptor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IInflator",
        name: "inflator",
        type: "address",
      },
    ],
    name: "setInflator",
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
] as const;

export class INounsArt__factory {
  static readonly abi = _abi;
  static createInterface(): INounsArtInterface {
    return new utils.Interface(_abi) as INounsArtInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): INounsArt {
    return new Contract(address, _abi, signerOrProvider) as INounsArt;
  }
}
