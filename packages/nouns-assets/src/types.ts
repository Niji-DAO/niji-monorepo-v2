export interface NounSeed {
  background: number;
  backDecoration: number;
  backgroundDecoration: number;
  special: number;
  back: number;
  clothe: number;
  choker: number;
  ear: number;
  hair: number;
  hat: number;
  headphone: number;
  leftHand: number;
}

export interface EncodedImage {
  filename: string;
  data: string;
}

export interface NounData {
  parts: EncodedImage[];
  background: string;
}
