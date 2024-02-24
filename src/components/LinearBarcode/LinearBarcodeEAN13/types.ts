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
type SymbolCharacter = [
  ModuleCharacter,
  ModuleCharacter,
  ModuleCharacter,
  ModuleCharacter,
  ModuleCharacter,
  ModuleCharacter,
  ModuleCharacter,
];

/**
 * Linear barcode data
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
