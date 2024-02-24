/**
 * X-dimension
 *
 * @remarks
 * The ideal width of a single module character.
 * The X-dimension at nominal size is 0.330 mm.
 */
export const xDimension = 0.33;

/**
 * The minimum width of the left quiet zone.
 *
 * @remarks
 * 11 times the X-dimension
 */
export const leftQuietZoneWidth = 11;

/**
 * The minimum width of the right quiet zone.
 *
 * @remarks
 * 7 times the X-dimension
 */
export const rightQuietZoneWidth = 7;

/**
 * The length of the symbol.
 *
 * @remarks
 * 113 times the X-dimension
 */
export const symbolLength = 113;

/**
 * The height of the symbol.
 *
 * @remarks
 * 22.85 mm
 */
export const symbolHeight = 22.85;

/**
 * The height of the guard bar.
 *
 * @remarks
 * The guard bar shall be extended downward by 5 times the X-dimension.
 */
export const guardBarHeight = symbolHeight + xDimension * 5;

/**
 * The space between the top of digits and the bottom of the bars.
 *
 * @remarks
 * The minimum space is 0.5 times the X-dimension. Normally, the space is 1 times the X-dimension.
 */
export const digitBarSpace = 1;

/**
 * The height of the barcode.
 *
 * @remarks
 * 25.93 mm
 */
export const barcodeHeight = 25.93;

/**
 * The font family of the digit.
 *
 * @remarks
 * A clearly legible font shall be used for the digits and OCR-B is recommended.
 */
export const digitFontFamily = "OCR-B";

/**
 * Number set
 *
 * @remarks
 * A number set maps a digit to its corresponding pattern of symbol characters.
 */
type NumberSet = {
  digit: number;
  symbolCharacterPattern: [
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
  ];
}[];

/**
 * Number set A
 *
 * @remarks
 * The number set A is used for the left half of the symbol.
 */
export const numberSetA: NumberSet = [
  {
    digit: 0,
    symbolCharacterPattern: [false, false, false, true, true, false, true],
  },
  {
    digit: 1,
    symbolCharacterPattern: [false, false, true, true, false, false, true],
  },
  {
    digit: 2,
    symbolCharacterPattern: [false, false, true, false, false, true, true],
  },
  {
    digit: 3,
    symbolCharacterPattern: [false, true, true, true, true, false, true],
  },
  {
    digit: 4,
    symbolCharacterPattern: [false, true, false, false, false, true, true],
  },
  {
    digit: 5,
    symbolCharacterPattern: [false, true, true, false, false, false, true],
  },
  {
    digit: 6,
    symbolCharacterPattern: [false, true, false, true, true, true, true],
  },
  {
    digit: 7,
    symbolCharacterPattern: [false, true, true, true, false, true, true],
  },
  {
    digit: 8,
    symbolCharacterPattern: [false, true, true, false, true, true, true],
  },
  {
    digit: 9,
    symbolCharacterPattern: [false, false, false, true, false, true, true],
  },
];

/**
 * Number set B
 *
 * @remarks
 * The number set B is used for the left half of the symbol.
 */
export const numberSetB: NumberSet = [
  {
    digit: 0,
    symbolCharacterPattern: [false, true, false, false, true, true, true],
  },
  {
    digit: 1,
    symbolCharacterPattern: [false, true, true, false, false, true, true],
  },
  {
    digit: 2,
    symbolCharacterPattern: [false, false, true, true, false, true, true],
  },
  {
    digit: 3,
    symbolCharacterPattern: [false, true, false, false, false, false, true],
  },
  {
    digit: 4,
    symbolCharacterPattern: [false, false, true, true, true, false, true],
  },
  {
    digit: 5,
    symbolCharacterPattern: [false, true, true, true, false, false, true],
  },
  {
    digit: 6,
    symbolCharacterPattern: [false, false, false, false, true, false, true],
  },
  {
    digit: 7,
    symbolCharacterPattern: [false, false, true, false, false, false, true],
  },
  {
    digit: 8,
    symbolCharacterPattern: [false, false, false, true, false, false, true],
  },
  {
    digit: 9,
    symbolCharacterPattern: [false, false, true, false, true, true, true],
  },
];

/**
 * Number set C
 *
 * @remarks
 * The number set C is used for the right half of the symbol.
 */
export const numberSetC: NumberSet = [
  {
    digit: 0,
    symbolCharacterPattern: [true, true, true, false, false, true, false],
  },
  {
    digit: 1,
    symbolCharacterPattern: [true, true, false, false, true, true, false],
  },
  {
    digit: 2,
    symbolCharacterPattern: [true, true, false, true, true, false, false],
  },
  {
    digit: 3,
    symbolCharacterPattern: [true, false, false, false, false, true, false],
  },
  {
    digit: 4,
    symbolCharacterPattern: [true, false, true, true, true, false, false],
  },
  {
    digit: 5,
    symbolCharacterPattern: [true, false, false, true, true, true, false],
  },
  {
    digit: 6,
    symbolCharacterPattern: [true, false, true, false, false, false, false],
  },
  {
    digit: 7,
    symbolCharacterPattern: [true, false, false, false, true, false, false],
  },
  {
    digit: 8,
    symbolCharacterPattern: [true, false, false, true, false, false, false],
  },
  {
    digit: 9,
    symbolCharacterPattern: [true, true, true, false, true, false, false],
  },
];

/**
 * Normal guard bar pattern (right and left)
 */
export const normalGuardBarPattern = [true, false, true];

/**
 * Centre guard bar pattern
 */
export const centreGuardBarPattern = [false, true, false, true, false];

/**
 * Map of a leading digit to its corresponding number set types.
 *
 * @remarks
 * The leading digit is encoded by the variable parity mix of number sets A and B for the six symbol characters in the left half of the symbol.
 */
export const leadingDigitNumberSetTypesMap: {
  leadingDigit: number;
  numberSetTypes: ("A" | "B")[];
}[] = [
  {
    leadingDigit: 0,
    numberSetTypes: ["A", "A", "A", "A", "A", "A"],
  },
  {
    leadingDigit: 1,
    numberSetTypes: ["A", "A", "B", "A", "B", "B"],
  },
  {
    leadingDigit: 2,
    numberSetTypes: ["A", "A", "B", "B", "A", "B"],
  },
  {
    leadingDigit: 3,
    numberSetTypes: ["A", "A", "B", "B", "B", "A"],
  },
  {
    leadingDigit: 4,
    numberSetTypes: ["A", "B", "A", "A", "B", "B"],
  },
  {
    leadingDigit: 5,
    numberSetTypes: ["A", "B", "B", "A", "A", "B"],
  },
  {
    leadingDigit: 6,
    numberSetTypes: ["A", "B", "B", "B", "A", "A"],
  },
  {
    leadingDigit: 7,
    numberSetTypes: ["A", "B", "A", "B", "A", "B"],
  },
  {
    leadingDigit: 8,
    numberSetTypes: ["A", "B", "A", "B", "B", "A"],
  },
  {
    leadingDigit: 9,
    numberSetTypes: ["A", "B", "B", "A", "B", "A"],
  },
];
