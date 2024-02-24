import { calculateCheckDigit } from "./checkDigits";
import {
  leadingDigitNumberSetTypesMap,
  numberSetA,
  numberSetB,
  numberSetC,
} from "./constants";
import { LinearBarcodeData } from "./types";

/**
 * Converts the data characters to the data of a linear barcode.
 * @param dataCharacters - The data characters
 * @returns The data of a linear barcode
 */
export default function convertDataCharactersToLinearBarcodeData(
  dataCharacters: number[],
): LinearBarcodeData {
  // Calculate the types of number set.
  const leadingDigit = dataCharacters[0];
  const numberSetTypes =
    leadingDigitNumberSetTypesMap.find(
      (pattern) => pattern.leadingDigit === leadingDigit,
    )?.numberSetTypes ?? null;
  if (numberSetTypes === null) {
    throw new Error("Invalid leading digit!");
  }

  // Calculate the left half symbol characters.
  const leftHalfDigits = dataCharacters.slice(1, 7);
  const leftHalfSymbolCharacters = leftHalfDigits.map(
    (leftHalfDigit, index) => {
      const numberSetType = numberSetTypes[index];
      if (numberSetType === "A") {
        const symbolCharacter =
          numberSetA.find((pattern) => pattern.digit === leftHalfDigit)
            ?.symbolCharacterPattern ?? null;
        if (symbolCharacter === null) {
          throw new Error("Invalid left half digits!");
        }
        return symbolCharacter;
      } else {
        const symbolCharacter =
          numberSetB.find((pattern) => pattern.digit === leftHalfDigit)
            ?.symbolCharacterPattern ?? null;
        if (symbolCharacter === null) {
          throw new Error("Invalid left half digits!");
        }
        return symbolCharacter;
      }
    },
  ) as LinearBarcodeData["leftHalfSymbolCharacters"];

  // Calculate the right half symbol characters.
  const rightHalfDigits = [
    ...dataCharacters.slice(7),
    calculateCheckDigit(dataCharacters),
  ];
  const rightHalfSymbolCharacters = rightHalfDigits.map((rightHalfDigit) => {
    const symbolCharacter =
      numberSetC.find((pattern) => pattern.digit === rightHalfDigit)
        ?.symbolCharacterPattern ?? null;
    if (symbolCharacter === null) {
      throw new Error("Invalid right half digits!");
    }
    return symbolCharacter;
  }) as LinearBarcodeData["rightHalfSymbolCharacters"];

  return {
    leftHalfSymbolCharacters: leftHalfSymbolCharacters,
    rightHalfSymbolCharacters: rightHalfSymbolCharacters,
  };
}
