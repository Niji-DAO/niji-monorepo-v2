import { PNGCollectionEncoder } from '@nouns/sdk';
import { promises as fs } from 'fs';
import path from 'path';
import { palette } from '../src/niji-palette-32.json';
import { readPngImage } from './utils';

const bgcolors = [
  'DDAEC6',
  'B5AEDD',
  'B1DDAE',
  '6F82E5',
  'E5756F',
  '6FB7E5',
  'E5D06F',
  '6FE5D7',
  'EF374D',
  'A2EF37',
  'EF6B37',
  '2567E0',
  '2D25E0',
  'EF1759',
  'E7BDF3',
  'B9FFF8',
  'FFF3B9',
  '0F1D38',
  '21380F',
  '092D3D',
  'FFA4AD',
  '000000',
  'D4C7FA',
  'C4C75F',
  '3B3978',
  '395A78',
  'EAF415',
  'F41589',
  '15F4BF',
  '1594F4',
  'CC5E0A',
  'CF70D1',
  '709AD1',
  '9B70D1',
  'D28D6F',
  'D2CA6F',
  'D26F98',
  '6FD2AF',
  'E4F1D0',
  'D0E4F1',
  'D0F1D1',
  'FFFFFF',
];

const encode = async (sourceFolder: string, destinationFilepath: string) => {
  const encoder = new PNGCollectionEncoder(palette);

  const partfolders = [
    '1-backDecorations',
    '2-backgroundDecorations',
    '3-specials',
    '4-leftHands',
    '5-backs',
    '6-clothes',
    '7-chokers',
    '8-ears',
    '9-hairs',
    '10-hats',
    '11-headphones',
  ];

  for (const folder of partfolders) {
    const folderpath = path.join(sourceFolder, folder);
    const files = await fs.readdir(folderpath);
    for (const file of files) {
      if (file === '.gitkeep') {
        continue;
      }
      const image = await readPngImage(path.join(folderpath, file));
      encoder.encodeImage(file.replace(/\.png$/, ''), image, folder);
    }
  }

  if (JSON.stringify(encoder.data.palette) !== JSON.stringify(palette)) {
    console.log('Palette changed! Aborting');

    await fs.writeFile('original_palette.json', JSON.stringify(palette, null, 2));
    await fs.writeFile('new_palette.json', JSON.stringify(encoder.data.palette, null, 2));

    // Update palette-32.json with new palette
    const newPaletteData = {
      bgcolors: bgcolors,
      palette: encoder.data.palette,
    };

    await fs.writeFile(
      path.join(__dirname, '../src/niji-palette-32.json'),
      JSON.stringify(newPaletteData, null, 2),
    );

    throw new Error(`Palette changed, expected to stay the same`);
  }

  let imageData = {
    bgcolors: bgcolors,
    palette: encoder.data.palette,
    images: encoder.data.images,
  };

  const modifiedImages = Object.fromEntries(
    Object.entries(imageData.images).map(([key, value]) => {
      const newKey = key.replace(/^\d+-/, '');
      return [newKey, value];
    }),
  );

  imageData = {
    ...imageData,
    images: modifiedImages,
  };

  // Write image data to the specified destination file
  await fs.writeFile(destinationFilepath, JSON.stringify(imageData, null, 2));

  // Write combined data to image-data-v32.json
  await fs.writeFile(
    path.join(__dirname, '../src/niji-image-data-32.json'),
    JSON.stringify(imageData, null, 2),
  );

  // Read the file and modify "empty" entries
  const imageDataV32 = JSON.parse(
    await fs.readFile(path.join(__dirname, '../src/niji-image-data-32.json'), 'utf-8'),
  );
  const modifyEmptyData = (data: any) => {
    if (Array.isArray(data)) {
      return data.map(item => {
        if (item.filename === 'empty') {
          return {
            filename: 'empty',
            data: '0x0000000000',
          };
        }
        return item;
      });
    }
    if (typeof data === 'object') {
      const keys = Object.keys(data);
      for (const key of keys) {
        data[key] = modifyEmptyData(data[key]);
      }
    }
    return data;
  };
  const modifiedImageData = modifyEmptyData(imageDataV32);

  // Write the modified data back to the file
  await fs.writeFile(
    path.join(__dirname, '../src/niji-image-data-32.json'),
    JSON.stringify(modifiedImageData, null, 2),
  );
};

encode(
  path.join(__dirname, '../images/niji-32-reduced'),
  path.join(__dirname, '../src/niji-image-data-32.json'),
);
