import calculateDigits from "./calculateDigits";
import { LinearBarcodeData } from "./types";

/**
 * Checks if the digits are valid
 * @param linearBarcodeData - The linear barcode data
 * @returns true if the digits are valid
 */
export default function checkDigits(
  linearBarcodeData: LinearBarcodeData,
): boolean {
  const digits = calculateDigits(linearBarcodeData);
  const dataCharacters = digits.slice(0, 12);
  const checkDigit = digits[12];
  const sum = dataCharacters.reduce(
    (sum, dataCharacter, index) =>
      sum + dataCharacter * (index % 2 === 0 ? 1 : 3),
    0,
  );
  const calculatedCheckDigit = (10 - (sum % 10)) % 10;
  return checkDigit === calculatedCheckDigit;
}
