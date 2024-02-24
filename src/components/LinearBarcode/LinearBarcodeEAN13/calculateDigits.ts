import {
  leadingDigitNumberSetTypesMap,
  numberSetA,
  numberSetB,
  numberSetC,
} from "./constants";
import { LinearBarcodeData } from "./types";

/**
 * Calculates the leading digit
 * @param linearBarcodeData - The linear barcode data
 * @returns The leading digit
 */
function calculateLeadingDigit(linearBarcodeData: LinearBarcodeData): number {
  // Calculate the number set types using the left half symbol characters.
  const numberSetTypes = linearBarcodeData.leftHalfSymbolCharacters.map(
    (symbolCharacter) => {
      if (
        numberSetA.find((pattern) =>
          pattern.symbolCharacterComposition.every(
            (moduleCharacter, index) =>
              moduleCharacter === symbolCharacter[index],
          ),
        )
      ) {
        return "A";
      } else {
        return "B";
      }
    },
  );

  // Find the leading digit using the calculated number set types.
  const leadingDigit = leadingDigitNumberSetTypesMap.find((pattern) =>
    pattern.numberSetTypes.every(
      (numberSetType, index) => numberSetType === numberSetTypes[index],
    ),
  ).leadingDigit;
  return leadingDigit;
}

/**
 * Calculates the digits
 * @param linearBarcodeData - The linear barcode data
 * @returns The digits
 */
export default function calculateDigits(
  linearBarcodeData: LinearBarcodeData,
): number[] {
  const leadingDigit = calculateLeadingDigit(linearBarcodeData);

  // Calculate the left half digits using the number sets A and B.
  const leftHalfDigits = linearBarcodeData.leftHalfSymbolCharacters.map(
    (symbolCharacter) =>
      (
        numberSetA.find((pattern) =>
          pattern.symbolCharacterComposition.every(
            (moduleCharacter, index) =>
              moduleCharacter === symbolCharacter[index],
          ),
        ) ||
        numberSetB.find((pattern) =>
          pattern.symbolCharacterComposition.every(
            (moduleCharacter, index) =>
              moduleCharacter === symbolCharacter[index],
          ),
        )
      ).digit,
  );

  // Calculate the right half digits using the number set C.
  const rightHalfDigits = linearBarcodeData.rightHalfSymbolCharacters.map(
    (symbolCharacter) => {
      return numberSetC.find((pattern) =>
        pattern.symbolCharacterComposition.every(
          (moduleCharacter, index) =>
            moduleCharacter === symbolCharacter[index],
        ),
      ).digit;
    },
  );
  return [leadingDigit, ...leftHalfDigits, ...rightHalfDigits];
}
