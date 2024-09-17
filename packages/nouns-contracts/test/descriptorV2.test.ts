import chai from 'chai';
import { solidity } from 'ethereum-waffle';
import { NounsDescriptorV2 } from '../typechain';
import ImageData from '../files/niji-image-data-v32.json';
import { LongestPart } from './types';
import { deployNounsDescriptorV2, populateDescriptorV2 } from './utils';
import { ethers } from 'hardhat';
import { appendFileSync } from 'fs';

chai.use(solidity);
const { expect } = chai;

describe('NounsDescriptorV2', () => {
  let nounsDescriptor: NounsDescriptorV2;
  let snapshotId: number;

  const part: LongestPart = {
    length: 0,
    index: 0,
  };
  const longest: Record<string, LongestPart> = {
    backDecorations: part,
    backgroundDecorations: part,
    specials: part,
    leftHands: part,
    backs: part,
    clothes: part,
    chokers: part,
    ears: part,
    hairs: part,
    hats: part,
    headphones: part,
  };

  before(async () => {
    nounsDescriptor = await deployNounsDescriptorV2();

    for (const [l, layer] of Object.entries(ImageData.images)) {
      for (const [i, item] of layer.entries()) {
        if (item.data.length > longest[l].length) {
          longest[l] = {
            length: item.data.length,
            index: i,
          };
        }
      }
    }

    await populateDescriptorV2(nounsDescriptor);
  });

  beforeEach(async () => {
    snapshotId = await ethers.provider.send('evm_snapshot', []);
  });

  afterEach(async () => {
    await ethers.provider.send('evm_revert', [snapshotId]);
  });

  // Unskip this test to validate the encoding of all parts. It ensures that no parts revert when building the token URI.
  // This test also outputs a parts.html file, which can be visually inspected.
  // Note that this test takes a long time to run. You must increase the mocha timeout to a large number.
  // it.skip('should generate valid token uri metadata for all supported parts when data uris are enabled', async () => {
  it('should generate valid token uri metadata for all supported parts when data uris are enabled', async () => {
    console.log('Running... this may take a little while...');

    const { bgcolors, images } = ImageData;
    const {
      backDecorations,
      backgroundDecorations,
      specials,
      leftHands,
      backs,
      clothes,
      chokers,
      ears,
      hairs,
      hats,
      headphones,
    } = images;
    console.log(`images OK`);
    const max = Math.max(
      backDecorations.length,
      backgroundDecorations.length,
      specials.length,
      leftHands.length,
      backs.length,
      clothes.length,
      chokers.length,
      ears.length,
      hairs.length,
      hats.length,
      headphones.length,
    );
    console.log(`max: ${max}`);
    for (let i = 1; i < max; i++) {
      const tokenUri = await nounsDescriptor.tokenURI(
        i,
        {
          background: Math.min(i, bgcolors.length - 1),
          backDecoration: Math.min(i, backDecorations.length - 1),
          backgroundDecoration: Math.min(i, backgroundDecorations.length - 1),
          special: Math.min(i, specials.length - 1),
          leftHand: Math.min(i, leftHands.length - 1),
          back: Math.min(i, backs.length - 1),
          clothe: Math.min(i, clothes.length - 1),
          choker: Math.min(i, chokers.length - 1),
          ear: Math.min(i, ears.length - 1),
          hair: Math.min(i, hairs.length - 1),
          hat: Math.min(i, hats.length - 1),
          headphone: Math.min(i, headphones.length - 1),
        },
        { gasLimit: 300_000_000 },
      );
      const { name, description, image } = JSON.parse(
        Buffer.from(tokenUri.replace('data:application/json;base64,', ''), 'base64').toString(
          'ascii',
        ),
      );
      console.log(`name: ${name}`);
      console.log(`description: ${description}`);
      console.log(`image: ${image}`);
      expect(name).to.equal(`Noun ${i}`);
      expect(description).to.equal(`Noun ${i} is a member of the Nouns DAO`);
      expect(image).to.not.be.undefined;

      appendFileSync(
        'parts.html',
        Buffer.from(image.split(';base64,').pop(), 'base64').toString('ascii'),
      );

      if (i && i % Math.round(max / 10) === 0) {
        console.log(`${Math.round((i / max) * 100)}% complete`);
      }
    }
  });
});
