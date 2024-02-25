import {
  leadingDigitNumberSetTypesMap,
  numberSetA,
  numberSetB,
  numberSetC,
} from "./constants";
import { LinearBarcodeData, SymbolCharacter } from "./types";

/**
 * Calculates the type of number set using number sets A and B.
 * @param symbolCharacter - The symbol character
 * @returns The type of number set
 */
export function calculateNumberSetType(
  symbolCharacter: SymbolCharacter,
): "A" | "B" {
  if (
    numberSetA.find((pattern) =>
      pattern.symbolCharacterPattern.every(
        (moduleCharacter, index) => moduleCharacter === symbolCharacter[index],
      ),
    )
  ) {
    return "A";
  } else if (
    numberSetB.find((pattern) =>
      pattern.symbolCharacterPattern.every(
        (moduleCharacter, index) => moduleCharacter === symbolCharacter[index],
      ),
    )
  ) {
    return "B";
  } else {
    throw new Error("Invalid symbol character!");
  }
}

/**
 * Calculates the leading digit.
 * @param numberSetTypes - The types of number set
 * @returns The leading digit
 */
export function calculateLeadingDigit(numberSetTypes: ("A" | "B")[]): number {
  const leadingDigit =
    leadingDigitNumberSetTypesMap.find((pattern) =>
      pattern.numberSetTypes.every(
        (numberSetType, index) => numberSetType === numberSetTypes[index],
      ),
    )?.leadingDigit ?? null;
  if (leadingDigit === null) {
    throw new Error("Invalid types of number set!");
  }
  return leadingDigit;
}

/**
 * Calculates the left half digit using number sets A and B.
 * @param symbolCharacter - The symbol character
 * @returns The left half digit
 */
export function calculateLeftHalfDigit(
  symbolCharacter: SymbolCharacter,
): number {
  const leftHalfDigit =
    (
      numberSetA.find((pattern) =>
        pattern.symbolCharacterPattern.every(
          (moduleCharacter, index) =>
            moduleCharacter === symbolCharacter[index],
        ),
      ) ||
      numberSetB.find((pattern) =>
        pattern.symbolCharacterPattern.every(
          (moduleCharacter, index) =>
            moduleCharacter === symbolCharacter[index],
        ),
      )
    )?.digit ?? null;
  if (leftHalfDigit === null) {
    throw new Error("Invalid symbol character!");
  }
  return leftHalfDigit;
}

/**
 * Calculates the right half digit using number set C.
 * @param symbolCharacter - The symbol character
 * @returns The right half digit
 */
export function calculateRightHalfDigit(
  symbolCharacter: SymbolCharacter,
): number {
  const rightHalfDigit =
    numberSetC.find((pattern) =>
      pattern.symbolCharacterPattern.every(
        (moduleCharacter, index) => moduleCharacter === symbolCharacter[index],
      ),
    )?.digit ?? null;
  if (rightHalfDigit === null) {
    throw new Error("Invalid symbol character!");
  }
  return rightHalfDigit;
}

/**
 * Calculates the digits
 * @param linearBarcodeData - The data of a linear barcode
 * @returns The digits
 */
export default function calculateDigits(
  linearBarcodeData: LinearBarcodeData,
): number[] {
  // Calculate the leading digit.
  const numberSetTypes = linearBarcodeData.leftHalfSymbolCharacters.map(
    (symbolCharacter) => calculateNumberSetType(symbolCharacter),
  );
  const leadingDigit = calculateLeadingDigit(numberSetTypes);

  // Calculate the left half digits.
  const leftHalfDigits = linearBarcodeData.leftHalfSymbolCharacters.map(
    (symbolCharacter) => calculateLeftHalfDigit(symbolCharacter),
  );

  // Calculate the right half digits.
  const rightHalfDigits = linearBarcodeData.rightHalfSymbolCharacters.map(
    (symbolCharacter) => calculateRightHalfDigit(symbolCharacter),
  );

  return [leadingDigit, ...leftHalfDigits, ...rightHalfDigits];
}
