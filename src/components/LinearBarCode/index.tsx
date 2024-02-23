import calculateCodes from "./calculateCodes";
import {
  centerBarHeight,
  guardBarHeight,
  height,
  minElementWidth,
  width,
} from "./constants";
import render from "./render";
import { BarcodeSymbol } from "./types";
import validate from "./validate";

export default class LinearBarcode {
  private readonly barcodeSymbol: BarcodeSymbol;

  constructor(barcodeSymbol: BarcodeSymbol) {
    this.barcodeSymbol = barcodeSymbol;
  }

  static validate(barcodeSymbol: BarcodeSymbol): boolean {
    return validate(barcodeSymbol);
  }

  getCodes(): string {
    return calculateCodes(this.barcodeSymbol).join("");
  }

  render(imageWidth, imageHeight): JSX.Element {
    return render(
      imageWidth,
      imageHeight,
      width,
      height,
      minElementWidth,
      guardBarHeight,
      centerBarHeight,
      this.barcodeSymbol,
    );
  }
}
