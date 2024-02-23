type BarcodeElement = 1 | 2 | 3 | 4;

type BarcodeCharacter = [
  BarcodeElement,
  BarcodeElement,
  BarcodeElement,
  BarcodeElement,
];

export type BarcodeSymbol = [
  BarcodeCharacter,
  BarcodeCharacter,
  BarcodeCharacter,
  BarcodeCharacter,
  BarcodeCharacter,
  BarcodeCharacter,
  BarcodeCharacter,
  BarcodeCharacter,
  BarcodeCharacter,
  BarcodeCharacter,
  BarcodeCharacter,
  BarcodeCharacter,
];
