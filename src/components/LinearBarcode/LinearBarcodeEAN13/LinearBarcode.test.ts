import { describe, expect, test } from "vitest";
import LinearBarcodeEAN13 from "./LinearBarcode";
import { LinearBarcodeData } from "./types";

describe("LinearBarcodeEAN13", () => {
  describe("constructor", () => {
    describe("when the argument is digits", () => {
      test("should throw an error if the digits are invalid", () => {
        const digits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        expect(() => {
          new LinearBarcodeEAN13(digits);
        }).toThrowError("Invalid digits!");
      });
      test("should not throw an error if the digits are valid", () => {
        const digits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const linearBarcode = new LinearBarcodeEAN13(digits);
        expect(linearBarcode.getDigits()).toEqual([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]);
      });
    });
    describe("when the argument is linearBarcodeData", () => {
      test("should throw an error if the linearBarcodeData is invalid", () => {
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
            [true, true, false, false, true, true, false],
          ],
        };
        expect(() => {
          new LinearBarcodeEAN13(linearBarcodeData);
        }).toThrowError("Check digit is invalid!");
      });
      test("should not throw an error if the linearBarcodeData is valid", () => {
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
        const linearBarcode = new LinearBarcodeEAN13(linearBarcodeData);
        expect(linearBarcode.getDigits()).toEqual([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]);
      });
    });
  });

  describe("getDefaultDataCharacters", () => {
    test("should return the default data characters", () => {
      expect(LinearBarcodeEAN13.getDefaultDataCharacters()).toEqual([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]);
    });
  });

  describe("getDigits", () => {
    test("should return the digits", () => {
      const linearBarcode = new LinearBarcodeEAN13([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]);
      expect(linearBarcode.getDigits()).toEqual([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]);
    });
  });

  describe("getDefaultLinearBarcodeData", () => {
    test("should return the default data of a linear barcode", () => {
      expect(LinearBarcodeEAN13.getDefaultLinearBarcodeData()).toEqual({
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
      });
    });
  });

  describe("getLinearBarcodeData", () => {
    test("should return the data of a linear barcode", () => {
      const linearBarcode = new LinearBarcodeEAN13([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]);
      expect(linearBarcode.getLinearBarcodeData()).toEqual({
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
      });
    });
  });
});
