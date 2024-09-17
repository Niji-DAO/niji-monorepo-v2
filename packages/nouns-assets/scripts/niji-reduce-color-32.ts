import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { PNG } from 'pngjs';
import { execFile } from 'child_process';

// 対象ディレクトリと出力ディレクトリ
const baseDir = 'images/niji-32';
const outputBaseDir = 'images/niji-32-com';
const tempDir = 'images/temp'; // 一時ディレクトリ
const subDirs = [
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

const maxColors = 15;

// pngquantを使用してPNG画像の色数をmaxColors以下に減らす関数
const reduceColors = async (
  inputPath: string,
  outputPath: string,
  tempFilePath: string,
): Promise<void> => {
  try {
    await sharp(inputPath)
      .ensureAlpha() // 透明度を保持
      .toColorspace('srgb')
      .toFile(tempFilePath);

    await new Promise((resolve, reject) => {
      execFile(
        'pngquant', // システムにインストールされたpngquantを使用
        [
          '--quality=0-100',
          `--colors=${maxColors}`,
          '--force',
          '--output',
          outputPath,
          tempFilePath,
        ],
        err => {
          if (err) {
            reject(err);
          } else {
            resolve(null);
          }
        },
      );
    });

    // 一時ファイルを削除
    fs.unlinkSync(tempFilePath);
  } catch (err) {
    console.error(`Error processing ${inputPath}: ${err}`);
    throw err;
  }
};

// ディレクトリを作成する関数
const createDirectory = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// PNGファイルの色数を取得する関数
const getColorCount = (filePath: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const colorSet = new Set<string>();
    fs.createReadStream(filePath)
      .pipe(new PNG())
      .on('parsed', function () {
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            const idx = (this.width * y + x) << 2;
            const color = `${this.data[idx]},${this.data[idx + 1]},${this.data[idx + 2]},${
              this.data[idx + 3]
            }`;
            colorSet.add(color);
          }
        }
        resolve(colorSet.size);
      })
      .on('error', err => reject(err));
  });
};

// 各ディレクトリ内のPNGファイルを処理する
const processImages = async () => {
  createDirectory(tempDir); // 一時ディレクトリの作成

  for (const subDir of subDirs) {
    const dirPath = path.join(baseDir, subDir);
    const outputDirPath = path.join(outputBaseDir, subDir);

    createDirectory(outputDirPath);

    const files = fs.readdirSync(dirPath);
    for (const fileName of files) {
      if (fileName.endsWith('.png')) {
        const inputFile = path.join(dirPath, fileName);
        const outputFile = path.join(outputDirPath, fileName);
        const tempFile = path.join(tempDir, fileName); // 一時ファイルパス

        try {
          await reduceColors(inputFile, outputFile, tempFile);
          console.log(`Processed file: ${outputFile}`);

          const colorCount = await getColorCount(outputFile);
          if (colorCount > maxColors) {
            console.log(
              `File with more than ${maxColors} colors: ${outputFile}, Color count: ${colorCount}`,
            );
          }
        } catch (error) {
          console.error(`Failed to process ${inputFile}`);
        }
      }
    }
  }
  console.log('All images processed successfully.');
};

processImages();
