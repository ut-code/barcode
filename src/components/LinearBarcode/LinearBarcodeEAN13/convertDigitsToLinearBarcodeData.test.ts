import { describe, expect, test } from "vitest";
import convertDataCharactersToLinearBarcodeData from "./convertDataCharactersToLinearBarcodeData";

describe("convertDataCharactersToLinearBarcodeData", () => {
  test("should convert data characters to the data of the linear barcode", () => {
    const dataCharacters = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const linearBarcodeData =
      convertDataCharactersToLinearBarcodeData(dataCharacters);
    expect(linearBarcodeData).toEqual({
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
