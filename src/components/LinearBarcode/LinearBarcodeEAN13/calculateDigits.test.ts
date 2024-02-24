import { describe, expect, test } from "vitest";
import calculateDigits, {
  calculateLeadingDigit,
  calculateLeftHalfDigit,
  calculateNumberSetType,
  calculateRightHalfDigit,
} from "./calculateDigits";
import {
  leadingDigitNumberSetTypesMap,
  numberSetA,
  numberSetB,
  numberSetC,
} from "./constants";
import { LinearBarcodeData, SymbolCharacter } from "./types";

describe("calculateNumberSetType", () => {
  for (let i = 0; i <= 9; i += 1) {
    test("should calculate the type of number set", () => {
      const symbolCharacter: SymbolCharacter =
        numberSetA[i].symbolCharacterPattern;
      const numberSetType = calculateNumberSetType(symbolCharacter);
      expect(numberSetType).toBe("A");
    });
  }
  for (let i = 0; i <= 9; i += 1) {
    test("should calculate the type of number set", () => {
      const symbolCharacter: SymbolCharacter =
        numberSetB[i].symbolCharacterPattern;
      const numberSetType = calculateNumberSetType(symbolCharacter);
      expect(numberSetType).toBe("B");
    });
  }
});

describe("calculateLeadingDigit", () => {
  for (let i = 0; i <= 9; i += 1) {
    test("should calculate the leading digit", () => {
      const numberSetTypes = leadingDigitNumberSetTypesMap[i].numberSetTypes;
      const leadingDigit = calculateLeadingDigit(numberSetTypes);
      expect(leadingDigit).toBe(i);
    });
  }
});

describe("calculateLeftHalfDigit", () => {
  for (let i = 0; i <= 9; i += 1) {
    test("should calculate the left half digit", () => {
      const symbolCharacter = numberSetA[i].symbolCharacterPattern;
      const leftHalfDigit = calculateLeftHalfDigit(symbolCharacter);
      expect(leftHalfDigit).toBe(numberSetA[i].digit);
    });
  }
  for (let i = 0; i <= 9; i += 1) {
    test("should calculate the left half digit", () => {
      const symbolCharacter = numberSetB[i].symbolCharacterPattern;
      const leftHalfDigit = calculateLeftHalfDigit(symbolCharacter);
      expect(leftHalfDigit).toBe(numberSetB[i].digit);
    });
  }
});

describe("calculateRightHalfDigit", () => {
  for (let i = 0; i <= 9; i += 1) {
    test("should calculate the right half digit", () => {
      const symbolCharacter = numberSetC[i].symbolCharacterPattern;
      const rightHalfDigit = calculateRightHalfDigit(symbolCharacter);
      expect(rightHalfDigit).toBe(numberSetC[i].digit);
    });
  }
});

describe("calculateDigits", () => {
  test("should calculate the digits", () => {
    const linearBarcodeData: LinearBarcodeData = {
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
    const digits = calculateDigits(linearBarcodeData);
    expect(digits).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});
