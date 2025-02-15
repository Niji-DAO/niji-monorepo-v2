import ImageData from "./image-data.json"
import { createCanvas, loadImage } from 'canvas';

export interface NounSeed {
  background: number;
  backDecoration: number;
  backgroundDecoration: number;
  special: number;
  leftHand: number;
  back: number;
  clothe: number;
  choker: number;
  ear: number;
  hair: number;
  hat: number;
  headphone: number;
}

export interface EncodedImage {
  filename: string;
  data: string;
}
export interface NounData {
  parts: EncodedImage[];
  background: string;
  base64Image: string;
}

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
} = ImageData.images;

const images = ImageData.images;
type ObjectKey = keyof typeof images;

const getFileNames = (seed: NounSeed): string[] => {
  return [
    { category: "backDecorations", filename: backDecorations[seed.backDecoration]?.filename },
    { category: "backgroundDecorations", filename: backgroundDecorations[seed.backgroundDecoration]?.filename },
    { category: "specials", filename: specials[seed.special]?.filename },
    { category: "leftHands", filename: leftHands[seed.leftHand]?.filename },
    { category: "backs", filename: backs[seed.back]?.filename },
    { category: "clothes", filename: clothes[seed.clothe]?.filename },
    { category: "chokers", filename: chokers[seed.choker]?.filename },
    { category: "ears", filename: ears[seed.ear]?.filename },
    { category: "hairs", filename: hairs[seed.hair]?.filename },
    { category: "hats", filename: hats[seed.hat]?.filename },
    { category: "headphones", filename: headphones[seed.headphone]?.filename },
  ]
  .filter(item => item.filename) // `null` や `undefined` を除外
  .map(item => `${item.category}/${item.filename}`); // `category/filename.png` の形式に変更
};

// 画像を合成して `base64` 文字列を取得する関数
const generateCompositeImage = async (filenames: string[], backgroundColor: string): Promise<string | null> => {
  console.log(`filenames: ${filenames}`);
  console.log(`backgroundColor: ${backgroundColor}`);

  const images = await Promise.all(
    filenames.map(async (filePath) => {
      try {
        const imageUrl = (await import(`../../../src/assets/niji/${filePath}.PNG`)).default;
        return loadImage(imageUrl);
      } catch (error) {
        console.warn(`画像の読み込みに失敗: ${filePath}`);
        return null;
      }
    })
  );

  // 有効な画像のみ取得
  const validImages = images.filter((img: any): img is CanvasImageSource => img !== null);
  if (validImages.length === 0) {
    console.error('有効な画像がありません。');
    return null;
  }

  // キャンバス作成（最初の画像のサイズを基準に）
  const width = validImages[0]?.width || 320;  // デフォルトサイズを設定
  const height = validImages[0]?.height || 320;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // **背景色を塗る（最下層）**
  ctx.fillStyle = `#${backgroundColor}`;
  ctx.fillRect(0, 0, width, height);

  // 画像を下から順に描画
  for (const img of validImages) {
    if (img) {
      ctx.drawImage(img, 0, 0, width, height);
    }
  }

  // `base64` 文字列を取得
  return canvas.toDataURL('image/png'); // "data:image/png;base64,..." の形式
};


export const getNounData = async (seed: NounSeed): Promise<NounData> => {
  console.log(`NounSeed seed: ${seed}`);
  console.log(`backDecorations length: ${backDecorations.length}`);
  console.log(`backgroundDecorations length: ${backgroundDecorations.length}`);
  console.log(`specials length: ${specials.length}`);
  console.log(`leftHands length: ${leftHands.length}`);
  console.log(`backs length: ${backs.length}`);
  console.log(`clothes length: ${clothes.length}`);
  console.log(`chokers length: ${chokers.length}`);
  console.log(`ears length: ${ears.length}`);
  console.log(`hairs length: ${hairs.length}`);
  console.log(`hats length: ${hats.length}`);
  console.log(`headphones length: ${headphones.length}`);
  console.log(`seed.backDecoration: ${seed.backDecoration}`);
  console.log(`seed.backgroundDecoration: ${seed.backgroundDecoration}`);
  console.log(`seed.special: ${seed.special}`);
  console.log(`seed.leftHand: ${seed.leftHand}`);
  console.log(`seed.back: ${seed.back}`);
  console.log(`seed.clothe: ${seed.clothe}`);
  console.log(`seed.choker: ${seed.choker}`);
  console.log(`seed.ear: ${seed.ear}`);
  console.log(`seed.hair: ${seed.hair}`);
  console.log(`seed.hat: ${seed.hat}`);
  console.log(`seed.headphone: ${seed.headphone}`);
  console.log(`specials[0]: ${JSON.stringify(specials[0])}`);
  console.log(`specials[1]: ${JSON.stringify(specials[1])}`);
  console.log(`specials[2]: ${JSON.stringify(specials[2])}`);
  console.log(`specials[3]: ${JSON.stringify(specials[3])}`);
  console.log(
    `backDecorations[seed.backDecoration]: ${JSON.stringify(backDecorations[seed.backDecoration])}`,
  );
  console.log(
    `backgroundDecorations[seed.backgroundDecoration]: ${JSON.stringify(backgroundDecorations[seed.backgroundDecoration])}`,
  );
  console.log(`specials[seed.special]: ${JSON.stringify(specials[seed.special])}`);
  console.log(
    `leftHands[seed.leftHand]: ${JSON.stringify(leftHands[seed.leftHand])}`,
  );
  console.log(
    `backs[seed.back]: ${JSON.stringify(backs[seed.back])}`,
  );
  console.log(
    `clothes[seed.clothe]: ${JSON.stringify(clothes[seed.clothe])}`,
  );
  console.log(
    `chokers[seed.choker]: ${JSON.stringify(chokers[seed.choker])}`,
  );
  console.log(
    `ears[seed.ear]: ${JSON.stringify(ears[seed.ear])}`,
  );
  console.log(
    `hairs[seed.hair]: ${JSON.stringify(hairs[seed.hair])}`,
  );
  console.log(
    `hats[seed.hat]: ${JSON.stringify(hats[seed.hat])}`,
  );
  console.log(
    `headphones[seed.headphone]: ${JSON.stringify(headphones[seed.headphone])}`,
  );
  const backgroundColor = ImageData.bgcolors[seed.background];

  // 画像ファイル名を取得
  const filenames = getFileNames(seed);

  // 画像を合成（背景色を一番下に入れる）
  const base64Image = await generateCompositeImage(filenames, backgroundColor);

  console.log(`base64Image: ${base64Image}`);

  return {
    parts: [
      backDecorations[seed.backDecoration],
      backgroundDecorations[seed.backgroundDecoration],
      specials[seed.special],
      leftHands[seed.leftHand],
      backs[seed.back],
      clothes[seed.clothe],
      chokers[seed.choker],
      ears[seed.ear],
      hairs[seed.hair],
      hats[seed.hat],
      headphones[seed.headphone],
    ],
    background: ImageData.bgcolors[seed.background],
    base64Image: base64Image || '',
  };
};

export const getRandomNounSeed = (): NounSeed => {
  console.log(backDecorations.length);
    console.log(backgroundDecorations.length);
    console.log(specials.length);
    console.log(backs.length);
    console.log(clothes.length);
    console.log(chokers.length);
    console.log(ears.length);
    console.log(hairs.length);
    console.log(hats.length);
    console.log(headphones.length);
    console.log(leftHands.length);
  return {
    background: Math.floor(Math.random() * ImageData.bgcolors.length),
    backDecoration: Math.floor(Math.random() * backDecorations.length),
    backgroundDecoration: Math.floor(Math.random() * backgroundDecorations.length),
    special: Math.floor(Math.random() * specials.length),
    back: Math.floor(Math.random() * backs.length),
    clothe: Math.floor(Math.random() * clothes.length),
    choker: Math.floor(Math.random() * chokers.length),
    ear: Math.floor(Math.random() * ears.length),
    hair: Math.floor(Math.random() * hairs.length),
    hat: Math.floor(Math.random() * hats.length),
    headphone: Math.floor(Math.random() * headphones.length),
    leftHand: Math.floor(Math.random() * leftHands.length),
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
