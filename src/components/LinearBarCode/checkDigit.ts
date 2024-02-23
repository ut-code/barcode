import calculateCodes from "./calculateCodes";
import { BarcodeSymbol } from "./types";

export default function checkDigit(barcodeSymbol: BarcodeSymbol): boolean {
  const codes = calculateCodes(barcodeSymbol);
  const dataCharacters = codes.slice(1, 12);
  const checkDigit = codes[12];
  const sum = [...dataCharacters]
    .reverse()
    .reduce(
      (sum, dataCharacter, index) =>
        sum + dataCharacter * (index % 2 === 0 ? 3 : 1),
      0,
    );
  const calculatedCheckDigit = (10 - (sum % 10)) % 10;
  return checkDigit === calculatedCheckDigit;
}
