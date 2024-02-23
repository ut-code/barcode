import { characterOddEvenPatternMap, characterPatternMap } from "./constants";
import { BarcodeSymbol } from "./types";

function calculateInitialCode(barcodeSymbol: BarcodeSymbol): number {
  const oddEvenArray = barcodeSymbol.slice(0, 6).map((barcodeCharacter) => {
    if (
      characterPatternMap.leftEvenParity.find(
        (patternMap) =>
          patternMap.patter.join("") === barcodeCharacter.join(""),
      )
    ) {
      return "even";
    } else {
      return "odd";
    }
  });
  const initialCode = characterOddEvenPatternMap.find(
    (patternMap) => patternMap.pattern.join("") === oddEvenArray.join(""),
  ).character;
  return initialCode;
}

export default function calculateCodes(barcodeSymbol: BarcodeSymbol): number[] {
  const initialCode = calculateInitialCode(barcodeSymbol);
  const leftCodes = barcodeSymbol.slice(0, 6).map((barcodeCharacter) => {
    return (
      characterPatternMap.leftOddParity.find(
        (patternMap) =>
          patternMap.patter.join("") === barcodeCharacter.join(""),
      ) ||
      characterPatternMap.leftEvenParity.find(
        (patternMap) =>
          patternMap.patter.join("") === barcodeCharacter.join(""),
      )
    ).character;
  });
  const rightCodes = barcodeSymbol.slice(6, 12).map((barcodeCharacter) => {
    return characterPatternMap.rightEvenParity.find(
      (patternMap) => patternMap.patter.join("") === barcodeCharacter.join(""),
    ).character;
  });
  return [initialCode, ...leftCodes, ...rightCodes];
}
