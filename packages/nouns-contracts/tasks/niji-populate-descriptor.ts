import { task, types } from 'hardhat/config';
import ImageData from '../files/niji-image-data-v32.json';
import { dataToDescriptorInput } from './utils';

task('niji-populate-descriptor', 'Populates the descriptor with color palettes and Noun parts')
  .addOptionalParam(
    'nftDescriptor',
    'The `NFTDescriptorV2` contract address',
    '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    types.string,
  )
  .addOptionalParam(
    'nounsDescriptor',
    'The `NounsDescriptorV2` contract address',
    '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    types.string,
  )
  .setAction(async ({ nftDescriptor, nounsDescriptor }, { ethers, network }) => {
    const options = { gasLimit: network.name === 'hardhat' ? 30000000 : undefined };

    const descriptorFactory = await ethers.getContractFactory('NounsDescriptorV2', {
      libraries: {
        NFTDescriptorV2: nftDescriptor,
      },
    });
    const descriptorContract = descriptorFactory.attach(nounsDescriptor);

    const { bgcolors, palette, images } = ImageData;
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

    console.log(`niji-populate-descriptor backDecorations.length: ${backDecorations.length}`);
    console.log(
      `niji-populate-descriptor backgroundDecorations.length: ${backgroundDecorations.length}`,
    );
    console.log(`niji-populate-descriptor specials.length: ${specials.length}`);
    console.log(`niji-populate-descriptor backs.length: ${backs.length}`);
    console.log(`niji-populate-descriptor clothes.length: ${clothes.length}`);
    console.log(`niji-populate-descriptor chokers.length: ${chokers.length}`);
    console.log(`niji-populate-descriptor ears.length: ${ears.length}`);
    console.log(`niji-populate-descriptor hairs.length: ${hairs.length}`);
    console.log(`niji-populate-descriptor hats.length: ${hats.length}`);
    console.log(`niji-populate-descriptor headphones.length: ${headphones.length}`);
    console.log(`niji-populate-descriptor leftHands.length: ${leftHands.length}`);
    const backDecorationsPage = dataToDescriptorInput(backDecorations.map(({ data }) => data));
    console.log('👌 backDecorationsPage');
    const backgroundDecorationsPage = dataToDescriptorInput(
      backgroundDecorations.map(({ data }) => data),
    );
    console.log('👌 backgroundDecorationsPage');
    const specialsPage = dataToDescriptorInput(specials.map(({ data }) => data));
    console.log('👌 specialsPage');
    const leftHandsPage = dataToDescriptorInput(leftHands.map(({ data }) => data));
    console.log('👌 leftHandsPage');
    const backsPage = dataToDescriptorInput(backs.map(({ data }) => data));
    console.log('👌 backsPage');
    const clothesPage = dataToDescriptorInput(clothes.map(({ data }) => data));
    console.log('👌 clothesPage');
    const chokersPage = dataToDescriptorInput(chokers.map(({ data }) => data));
    console.log('👌 chokersPage');
    const earsPage = dataToDescriptorInput(ears.map(({ data }) => data));
    console.log('👌 earsPage');
    const hairsPage = dataToDescriptorInput(hairs.map(({ data }) => data));
    console.log('👌 hairsPage');
    const hatsPage = dataToDescriptorInput(hats.map(({ data }) => data));
    console.log('👌 hatsPage');
    const headphonesPage = dataToDescriptorInput(headphones.map(({ data }) => data));
    console.log('👌 headphonesPage');

    await descriptorContract.addManyBackgrounds(bgcolors);
    await descriptorContract.setPalette(0, `0x000000${palette.join('')}`);

    await descriptorContract.addBackDecorations(
      backDecorationsPage.encodedCompressed,
      backDecorationsPage.originalLength,
      backDecorationsPage.itemCount,
      options,
    );

    console.log('👌 add back decorations');

    await descriptorContract.addBackgroundDecorations(
      backgroundDecorationsPage.encodedCompressed,
      backgroundDecorationsPage.originalLength,
      backgroundDecorationsPage.itemCount,
      options,
    );

    console.log('👌 add background decorations');

    await descriptorContract.addSpecials(
      specialsPage.encodedCompressed,
      specialsPage.originalLength,
      specialsPage.itemCount,
      options,
    );

    console.log('👌 add specials');

    await descriptorContract.addLeftHands(
      leftHandsPage.encodedCompressed,
      leftHandsPage.originalLength,
      leftHandsPage.itemCount,
      options,
    );

    console.log('👌 add left hands');

    await descriptorContract.addBacks(
      backsPage.encodedCompressed,
      backsPage.originalLength,
      backsPage.itemCount,
      options,
    );

    console.log('👌 add backs');

    await descriptorContract.addClothes(
      clothesPage.encodedCompressed,
      clothesPage.originalLength,
      clothesPage.itemCount,
      options,
    );

    console.log('👌 add clothes');

    await descriptorContract.addChokers(
      chokersPage.encodedCompressed,
      chokersPage.originalLength,
      chokersPage.itemCount,
      options,
    );

    console.log('👌 add chokers');

    await descriptorContract.addEars(
      earsPage.encodedCompressed,
      earsPage.originalLength,
      earsPage.itemCount,
      options,
    );

    console.log('👌 add ears');

    await descriptorContract.addHairs(
      hairsPage.encodedCompressed,
      hairsPage.originalLength,
      hairsPage.itemCount,
      options,
    );

    console.log('👌 add hairs');

    await descriptorContract.addHats(
      hatsPage.encodedCompressed,
      hatsPage.originalLength,
      hatsPage.itemCount,
      options,
    );

    console.log('👌 add hats');

    await descriptorContract.addHeadphones(
      headphonesPage.encodedCompressed,
      headphonesPage.originalLength,
      headphonesPage.itemCount,
      options,
    );

    console.log('👌 add headphones');

    console.log('Descriptor populated with palettes and parts.');
  });
