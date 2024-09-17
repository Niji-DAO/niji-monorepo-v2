import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { PNG } from 'pngjs';
import { kmeans } from 'ml-kmeans';

// 対象ディレクトリと出力ディレクトリ
const baseDir = 'images/niji-32-com';
const outputBaseDir = 'images/niji-32-reduced';
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

// 全画像の合計色数を255色以下にするための最大色数
const maxTotalColors = 250;

// PNGファイルの色数を取得する関数
const getColorList = (filePath: string): Promise<number[][]> => {
  return new Promise((resolve, reject) => {
    const colorList: number[][] = [];
    fs.createReadStream(filePath)
      .pipe(new PNG())
      .on('parsed', function () {
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            const idx = (this.width * y + x) << 2;
            const r = this.data[idx];
            const g = this.data[idx + 1];
            const b = this.data[idx + 2];
            const a = this.data[idx + 3];
            if (a > 0) {
              // アルファチャンネルがゼロでない色のみを考慮
              colorList.push([r, g, b]);
            }
          }
        }
        resolve(colorList);
      })
      .on('error', err => reject(err));
  });
};

// すべての画像から共通のパレットを生成
const createCommonPalette = async (): Promise<number[][]> => {
  let allColors: number[][] = [];

  for (const subDir of subDirs) {
    const dirPath = path.join(baseDir, subDir);
    const files = fs.readdirSync(dirPath);

    for (const fileName of files) {
      if (fileName.endsWith('.png')) {
        const filePath = path.join(dirPath, fileName);
        const colorList = await getColorList(filePath);
        allColors = allColors.concat(colorList);
      }
    }
  }

  // K-means クラスタリングを使って256色に色を統合
  const { centroids } = kmeans(allColors, maxTotalColors, {
    maxIterations: 100,
    tolerance: 1e-5,
  });

  return centroids;
};

// 最も近い色を見つける関数
const findClosestColor = (color: number[], palette: number[][]): number[] => {
  let closestColor = palette[0];
  let minDistance = Number.MAX_VALUE;

  for (const p of palette) {
    const distance =
      Math.pow(color[0] - p[0], 2) + Math.pow(color[1] - p[1], 2) + Math.pow(color[2] - p[2], 2);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = p;
    }
  }

  return closestColor;
};

// 共通パレットを使用してPNG画像を再マッピングして色数を減らす関数
const remapImageToPalette = async (
  inputPath: string,
  outputPath: string,
  commonPalette: number[][],
): Promise<void> => {
  try {
    const image = sharp(inputPath);
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

    const remappedData = Buffer.alloc(data.length);

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3]; // アルファチャンネルを取得

      if (alpha === 0) {
        // アルファがゼロ、つまり透明なピクセルはそのままにする
        remappedData[i] = data[i];
        remappedData[i + 1] = data[i + 1];
        remappedData[i + 2] = data[i + 2];
        remappedData[i + 3] = data[i + 3];
      } else {
        // 透明でない場合は色を再マッピング
        const color = [data[i], data[i + 1], data[i + 2]];
        const closestColor = findClosestColor(color, commonPalette);
        remappedData[i] = closestColor[0];
        remappedData[i + 1] = closestColor[1];
        remappedData[i + 2] = closestColor[2];
        remappedData[i + 3] = alpha; // 透明度はそのまま
      }
    }

    // 再マッピングされた画像データを保存
    await sharp(remappedData, {
      raw: { width: info.width, height: info.height, channels: 4 },
    }).toFile(outputPath);
  } catch (err) {
    console.error(`Error processing ${inputPath}: ${err}`);
    throw err;
  }
};

// ディレクトリを作成する関数
const createDirectory = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Directory created: ${dirPath}`);
  }
};

// 各ディレクトリ内のPNGファイルを処理し、最終的に色数をカウントして出力
const processImagesWithCommonPalette = async () => {
  const commonPalette = await createCommonPalette();
  let totalColorCount = 0;

  for (const subDir of subDirs) {
    const dirPath = path.join(baseDir, subDir);
    const outputDirPath = path.join(outputBaseDir, subDir);

    createDirectory(outputDirPath);

    const files = fs.readdirSync(dirPath);
    for (const fileName of files) {
      if (fileName.endsWith('.png')) {
        const inputFile = path.join(dirPath, fileName);
        const outputFile = path.join(outputDirPath, fileName);

        try {
          await remapImageToPalette(inputFile, outputFile, commonPalette);
          console.log(`Processed file: ${outputFile}`);

          // 変換後の画像の色数を取得して加算
          const colorSet = await getColorList(outputFile);
          totalColorCount += colorSet.length;
        } catch (error) {
          console.error(`Failed to process ${inputFile}`);
        }
      }
    }
  }

  console.log(`Total color count after processing: ${totalColorCount}`);
};

processImagesWithCommonPalette();
