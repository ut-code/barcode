import calculateDigits from "./calculateDigits";
import render from "./render";
import { LinearBarcodeData } from "./types";
import validate from "./validate";

/**
 * EAN-13 linear barcode
 *
 * @see https://ref.gs1.org/standards/genspecs/
 */
export default class LinearBarcodeEAN13 {
  private readonly linearBarcodeData: LinearBarcodeData;

  constructor(linearBarcodeData: LinearBarcodeData) {
    if (!validate(linearBarcodeData)) {
      throw new Error("Invalid linear barcode data!");
    }
    this.linearBarcodeData = linearBarcodeData;
  }

  /**
   * Validates the linear barcode data
   * @param linearBarcodeData - The linear barcode data
   * @returns true if the linear barcode data is valid
   */
  static validate(linearBarcodeData: LinearBarcodeData): boolean {
    return validate(linearBarcodeData);
  }

  /**
   * Calculates the digits
   * @returns The digits
   */
  getDigits(): number[] {
    return calculateDigits(this.linearBarcodeData);
  }

  /**
   * Gets the default linear barcode data
   * @returns The default linear barcode data
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
   * Gets the linear barcode data
   * @returns The linear barcode data
   */
  getLinearBarcodeData(): LinearBarcodeData {
    return this.linearBarcodeData;
  }

  /**
   * Renders the linear barcode
   * @param style - The style
   * @param options - The options
   * @returns The SVG image
   */
  render(
    style?: React.CSSProperties,
    options?: { showDigits?: boolean },
  ): JSX.Element {
    return render(this.linearBarcodeData, style, options);
  }
}
