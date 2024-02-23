import checkDigit from "./checkDigit";
import { characterPatternMap } from "./constants";
import { BarcodeSymbol } from "./types";

export default function validate(barcodeSymbol: BarcodeSymbol): boolean {
  const leftBarcodeSymbol = barcodeSymbol.slice(0, 6);
  if (
    !leftBarcodeSymbol.every(
      (barcodeCharacter) =>
        characterPatternMap.leftOddParity.some(
          (patternMap) =>
            patternMap.patter.join("") === barcodeCharacter.join(""),
        ) ||
        characterPatternMap.leftEvenParity.some(
          (patternMap) =>
            patternMap.patter.join("") === barcodeCharacter.join(""),
        ),
    )
  ) {
    return false;
  }

  const rightBarcodeSymbol = barcodeSymbol.slice(6, 12);
  if (
    !rightBarcodeSymbol.every((barcodeCharacter) =>
      characterPatternMap.rightEvenParity.some(
        (patternMap) =>
          patternMap.patter.join("") === barcodeCharacter.join(""),
      ),
    )
  ) {
    return false;
  }

  if (checkDigit(barcodeSymbol) === false) {
    return false;
  }
  return true;
}
