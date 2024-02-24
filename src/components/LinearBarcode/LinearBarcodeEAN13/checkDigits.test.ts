import { describe, expect, test } from "vitest";
import checkDigits, { calculateCheckDigit } from "./checkDigits";

describe("calculateCheckDigit", () => {
  test("should calculate the check digit", () => {
    const dataCharacters = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const checkDigit = calculateCheckDigit(dataCharacters);
    expect(checkDigit).toBe(0);
  });
  test("should calculate the check digit", () => {
    const dataCharacters = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const checkDigit = calculateCheckDigit(dataCharacters);
    expect(checkDigit).toBe(9);
  });
  test("should calculate the check digit", () => {
    const dataCharacters = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const checkDigit = calculateCheckDigit(dataCharacters);
    expect(checkDigit).toBe(8);
  });
  test("should calculate the check digit", () => {
    const dataCharacters = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const checkDigit = calculateCheckDigit(dataCharacters);
    expect(checkDigit).toBe(7);
  });
  test("should calculate the check digit", () => {
    const dataCharacters = [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const checkDigit = calculateCheckDigit(dataCharacters);
    expect(checkDigit).toBe(4);
  });
  test("should calculate the check digit", () => {
    const dataCharacters = [0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const checkDigit = calculateCheckDigit(dataCharacters);
    expect(checkDigit).toBe(8);
  });
});

describe("checkDigits", () => {
  test("should check digits", () => {
    const digits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const result = checkDigits(digits);
    expect(result).toBe(true);
  });
  test("should check digits", () => {
    const digits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
    const result = checkDigits(digits);
    expect(result).toBe(false);
  });
});
