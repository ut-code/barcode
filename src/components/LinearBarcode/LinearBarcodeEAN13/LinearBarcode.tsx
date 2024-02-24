import calculateDigits from "./calculateDigits";
import checkDigits from "./checkDigits";
import convertDataCharactersToLinearBarcodeData from "./convertDataCharactersToLinearBarcodeData";
import render from "./render";
import { LinearBarcodeData } from "./types";

/**
 * EAN-13 linear barcode
 *
 * @see https://ref.gs1.org/standards/genspecs/
 */
export default class LinearBarcodeEAN13 {
  private readonly linearBarcodeData: LinearBarcodeData;

  /**
   * Constructs a new instance with the given digits.
   * @param digits - The digits
   */
  constructor(digits: number[]);
  /**
   * Constructs a new instance with the given data of a linear barcode.
   * @param linearBarcodeData - The data of a linear barcode
   */
  constructor(linearBarcodeData: LinearBarcodeData);
  constructor(digitsOrLinearBarcodeData: LinearBarcodeData | number[]) {
    if (Array.isArray(digitsOrLinearBarcodeData)) {
      if (digitsOrLinearBarcodeData.length !== 12) {
        throw new Error("Invalid digits!");
      }
      this.linearBarcodeData = convertDataCharactersToLinearBarcodeData(
        digitsOrLinearBarcodeData,
      );
    } else {
      const digits = calculateDigits(digitsOrLinearBarcodeData);
      if (!checkDigits(digits)) {
        throw new Error("Check digit is invalid!");
      }
      this.linearBarcodeData = digitsOrLinearBarcodeData;
    }
  }

  /**
   * Gets the default data characters.
   * @returns The data characters
   */
  static getDefaultDataCharacters(): number[] {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  /**
   * Calculates the digits.
   * @returns The digits
   */
  getDigits(): number[] {
    return calculateDigits(this.linearBarcodeData);
  }

  /**
   * Gets the default data of a linear barcode.
   * @returns The data of a linear barcode
   */
  static getDefaultLinearBarcodeData(): LinearBarcodeData {
    return {
      leftHalfSymbolCharacters: [
        [false, false, false, true, true, false, true],
        [false, false, false, true, true, false, true],
        [false, false, false, true, true, false, true],
        [false, false, false, true, true, false, true],
        [false, false, false, true, true, false, true],
        [false, false, false, true, true, false, true],
      ],
      rightHalfSymbolCharacters: [
        [true, true, true, false, false, true, false],
        [true, true, true, false, false, true, false],
        [true, true, true, false, false, true, false],
        [true, true, true, false, false, true, false],
        [true, true, true, false, false, true, false],
        [true, true, true, false, false, true, false],
      ],
    };
  }

  /**
   * Gets the data of a linear barcode.
   * @returns The data of a linear barcode
   */
  getLinearBarcodeData(): LinearBarcodeData {
    return this.linearBarcodeData;
  }

  /**
   * Renders the linear barcode.
   * @param options - The options
   * @returns The SVG image
   */
  render(options?: { showDigits?: boolean }): JSX.Element {
    return render(this.linearBarcodeData, options);
  }
}
