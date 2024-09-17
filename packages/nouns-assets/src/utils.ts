import { keccak256 as solidityKeccak256 } from '@ethersproject/solidity';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { NounSeed, NounData } from './types';
import { images, bgcolors } from './image-s3.json';

const {
  backDecorations,
  backgroundDecorations,
  specials,
  backs,
  clothes,
  chokers,
  ears,
  hairs,
  hats,
  headphones,
  leftHands,
} = images;

type ObjectKey = keyof typeof images;

/**
 * Get encoded part and background information using a Niji seed
 * @param seed The Niji seed
 */
export const getNounData = (seed: NounSeed): NounData => {
  return {
    parts: [
      backDecorations[seed.backDecoration],
      backgroundDecorations[seed.backgroundDecoration],
      specials[seed.special],
      backs[seed.back],
      clothes[seed.clothe],
      chokers[seed.choker],
      ears[seed.ear],
      hairs[seed.hair],
      hats[seed.hat],
      headphones[seed.headphone],
      leftHands[seed.leftHand],
    ],
    background: bgcolors[seed.background],
  };
};

/**
 * Generate a random Niji seed
 * @param seed The Niji seed
 */
export const getRandomNounSeed = (): NounSeed => {
  return {
    background: Math.floor(Math.random() * bgcolors.length),
    backDecoration: Math.floor(Math.random() * backDecorations.length),
    backgroundDecoration: Math.floor(Math.random() * backgroundDecorations.length),
    special: Math.floor(Math.random() * specials.length),
    back: Math.floor(Math.random() * ears.length),
    clothe: Math.floor(Math.random() * clothes.length),
    choker: Math.floor(Math.random() * chokers.length),
    ear: Math.floor(Math.random() * backs.length),
    hair: Math.floor(Math.random() * hairs.length),
    hat: Math.floor(Math.random() * hats.length),
    headphone: Math.floor(Math.random() * headphones.length),
    leftHand: Math.floor(Math.random() * leftHands.length),
  };
};

/**
 * Emulate bitwise right shift and uint cast
 * @param value A Big Number
 * @param shiftAmount The amount to right shift
 * @param uintSize The uint bit size to cast to
 */
export const shiftRightAndCast = (
  value: BigNumberish,
  shiftAmount: number,
  uintSize: number,
): string => {
  const shifted = BigNumber.from(value).shr(shiftAmount).toHexString();
  return `0x${shifted.substring(shifted.length - uintSize / 4)}`;
};

/**
 * Emulates the NounsSeeder.sol methodology for pseudorandomly selecting a part
 * @param pseudorandomness Hex representation of a number
 * @param partCount The number of parts to pseudorandomly choose from
 * @param shiftAmount The amount to right shift
 * @param uintSize The size of the unsigned integer
 */
export const getPseudorandomPart = (
  pseudorandomness: string,
  partCount: number,
  shiftAmount: number,
  uintSize = 48,
): number => {
  const hex = shiftRightAndCast(pseudorandomness, shiftAmount, uintSize);
  return BigNumber.from(hex).mod(partCount).toNumber();
};

/**
 * Emulates the NounsSeeder.sol methodology for generating a Niji seed
 * @param nounId The Niji tokenId used to create pseudorandomness
 * @param blockHash The block hash use to create pseudorandomness
 */
export const getNounSeedFromBlockHash = (nounId: BigNumberish, blockHash: string): NounSeed => {
  const pseudorandomness = solidityKeccak256(['bytes32', 'uint256'], [blockHash, nounId]);
  return {
    background: getPseudorandomPart(pseudorandomness, bgcolors.length, 0),
    backDecoration: getPseudorandomPart(pseudorandomness, backDecorations.length, 48),
    backgroundDecoration: getPseudorandomPart(pseudorandomness, backgroundDecorations.length, 96),
    special: getPseudorandomPart(pseudorandomness, specials.length, 144),
    back: getPseudorandomPart(pseudorandomness, backs.length, 192),
    clothe: getPseudorandomPart(pseudorandomness, clothes.length, 240),
    choker: getPseudorandomPart(pseudorandomness, chokers.length, 288),
    ear: getPseudorandomPart(pseudorandomness, ears.length, 336),
    hair: getPseudorandomPart(pseudorandomness, hairs.length, 384),
    hat: getPseudorandomPart(pseudorandomness, hats.length, 432),
    headphone: getPseudorandomPart(pseudorandomness, headphones.length, 480),
    leftHand: getPseudorandomPart(pseudorandomness, leftHands.length, 528),
  };
};

/**
 * Get encoded part information for one trait
 * @param partType The label of the part type to use
 * @param partIndex The index within the image data array of the part to get
 */
export const getPartData = (partType: string, partIndex: number): string => {
  const part = partType as ObjectKey;
  return images[part][partIndex].data;
};
