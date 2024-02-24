import checkDigits from "./checkDigits";
import {
  leadingDigitNumberSetTypesMap,
  numberSetA,
  numberSetB,
  numberSetC,
} from "./constants";
import { LinearBarcodeData } from "./types";

/**
 * Validates the linear barcode data
 * @param linearBarcodeData - The linear barcode data
 * @returns true if the linear barcode data is valid
 */
export default function validate(
  linearBarcodeData: LinearBarcodeData,
): boolean {
  // Check if all of the left half symbol characters are belong to number sets A or B.
  const leftHalfSymbolCharacters = linearBarcodeData.leftHalfSymbolCharacters;
  if (
    !leftHalfSymbolCharacters.every(
      (symbolCharacter) =>
        numberSetA.some((pattern) =>
          pattern.symbolCharacterComposition.every(
            (moduleCharacter, index) =>
              moduleCharacter === symbolCharacter[index],
          ),
        ) ||
        numberSetB.some((pattern) =>
          pattern.symbolCharacterComposition.every(
            (moduleCharacter, index) =>
              moduleCharacter === symbolCharacter[index],
          ),
        ),
    )
  ) {
    return false;
  }

  // Check if all of the right half symbol characters are belong to number set C.
  const rightHalfSymbolCharacters = linearBarcodeData.rightHalfSymbolCharacters;
  if (
    !rightHalfSymbolCharacters.every((symbolCharacter) =>
      numberSetC.some((pattern) =>
        pattern.symbolCharacterComposition.every(
          (moduleCharacter, index) =>
            moduleCharacter === symbolCharacter[index],
        ),
      ),
    )
  ) {
    return false;
  }

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

  // Check if the corresponding leading digit exists.
  if (
    !leadingDigitNumberSetTypesMap.some((pattern) =>
      pattern.numberSetTypes.every(
        (numberSetType, index) => numberSetType === numberSetTypes[index],
      ),
    )
  ) {
    return false;
  }

  // Check if the digits are valid.
  if (!checkDigits(linearBarcodeData)) {
    return false;
  }
  return true;
}
