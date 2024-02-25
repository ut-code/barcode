/**
 * Module character
 *
 * @remarks
 * Module character is a minimal unit. It is either black or white.
 */
type ModuleCharacter = boolean;

/**
 * Symbol character
 *
 * @remarks
 * Symbol character consists of 7 module characters and encodes a single digit.
 */
export type SymbolCharacter = [
  ModuleCharacter,
  ModuleCharacter,
  ModuleCharacter,
  ModuleCharacter,
  ModuleCharacter,
  ModuleCharacter,
  ModuleCharacter,
];

/**
 * The data of a linear barcode
 *
 * @remarks
 * The data of a linear barcode consists of 6 left half symbol characters and 6 right half symbol characters.
 */
export type LinearBarcodeData = {
  leftHalfSymbolCharacters: [
    SymbolCharacter,
    SymbolCharacter,
    SymbolCharacter,
    SymbolCharacter,
    SymbolCharacter,
    SymbolCharacter,
  ];
  rightHalfSymbolCharacters: [
    SymbolCharacter,
    SymbolCharacter,
    SymbolCharacter,
    SymbolCharacter,
    SymbolCharacter,
    SymbolCharacter,
  ];
};
