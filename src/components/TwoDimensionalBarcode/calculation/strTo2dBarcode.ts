import strToEisuData from "./utils/strToEisuData";
import strTo8bitData from "./utils/strTo8bitData";
import strToSjisData from "./utils/strToSjisData";
import makeOrderArrayForData from "./utils/makeOrderArrayForData";
import { EncodingMode } from "../types";

/**
 * 符号化モードに応じてデータを符号化する
 * @param inputText - 平文
 * @param mode - 符号化モード
 * @returns `{符号化されたデータ, 誤り訂正符号}`
 */
export function encodeStrByMode(inputText: string, mode: EncodingMode) {
  if (mode === "8bit") {
    return strTo8bitData(inputText);
  } else if (mode === "eisu") {
    return strToEisuData(inputText);
  } else if (mode === "sjis") {
    return strToSjisData(inputText);
  } else {
    throw new Error("Invalid mode");
  }
}

/**
 * 機能パターンを挿入する
 * @param cells - 二次元コードのセル
 * @returns `cells` に機能パターンを挿入した二次元コードのセル
 */
export function insertFunctionalPattern(cells: boolean[][]) {
  for (let i = 0; i < 21; ++i) {
    for (let j = 0; j < 21; ++j) {
      if (i === 0 || i === 6) {
        if ((j >= 0 && j < 7) || (j >= 14 && j < 21)) {
          cells[i][j] = true;
        }
      } else if (j === 0 || j === 6) {
        if ((i >= 0 && i < 7) || (i >= 14 && i < 21)) {
          cells[i][j] = true;
        }
      }

      if (i === 14 || i === 20) {
        if (j >= 0 && j < 7) {
          cells[i][j] = true;
        }
      } else if (j === 14 || j === 20) {
        if (i >= 0 && i < 7) {
          cells[i][j] = true;
        }
      }

      if (
        (i >= 2 && i < 5 && j >= 2 && j < 5) ||
        (i >= 2 && i < 5 && j >= 16 && j < 19) ||
        (i >= 16 && i < 19 && j >= 2 && j < 5)
      ) {
        cells[i][j] = true;
      }

      if ((i === 6 && j % 2 === 0) || (j === 6 && i % 2 === 0)) {
        cells[i][j] = true;
      }

      cells[13][8] = true;
    }
  }
  return cells;
}

/**
 * 形式情報を挿入する
 * @remarks
 * Level M, マスクパターン 000 として固定
 * @param cells - 二次元コードのセル
 * @returns `cells` に形式情報を挿入した二次元コードのセル
 */
export function insertFormatInfo(cells: boolean[][]) {
  for (let i = 0; i < 21; ++i) {
    for (let j = 0; j < 21; ++j) {
      const formatInformation: number = parseInt("101010000010010", 2);
      if (j === 8 && i < 8) {
        if (i < 6) {
          if ((formatInformation >> i) % 2 === 1) {
            cells[i][j] = true;
          }
        } else if (i > 6) {
          if ((formatInformation >> (i - 1)) % 2 === 1) {
            cells[i][j] = true;
          }
        }
      } else if (j === 8 && i > 13) {
        if ((formatInformation >> (i - 6)) % 2 === 1) {
          cells[i][j] = true;
        }
      } else if (i === 8 && j < 8) {
        if (j < 6) {
          if ((formatInformation >> (14 - j)) % 2 === 1) {
            cells[i][j] = true;
          }
        } else if (j > 6) {
          if ((formatInformation >> (15 - j)) % 2 === 1) {
            cells[i][j] = true;
          }
        }
      } else if (i === 8 && j > 13) {
        if ((formatInformation >> (20 - j)) % 2 === 1) {
          cells[i][j] = true;
        }
      }
    }
  }
  return cells;
}

/**
 * データと誤り訂正符号を挿入する
 * @param cells - 二次元コードのセル
 * @param inputText - 平文
 * @param mode - 符号化モード
 * @returns `cells` にデータと誤り訂正符号を挿入した二次元コードのセル
 */
export function insertEncodedData(
  cells: boolean[][],
  inputText: string,
  mode: EncodingMode,
) {
  const { bitData, errorCorrectionCode } = encodeStrByMode(inputText, mode);

  // データを埋める順番を示す配列を作成する。
  const orderArrayForData: number[][] = makeOrderArrayForData();

  const totalData = (bitData << BigInt(10 * 8)) + errorCorrectionCode;
  for (let i = 0; i < 26 * 8; ++i) {
    if ((totalData >> BigInt(26 * 8 - i - 1)) % BigInt(2) === BigInt(1)) {
      cells[orderArrayForData[i][0]][orderArrayForData[i][1]] = true;
    }
  }
  return { cellsWithData: cells, orderArrayForData: orderArrayForData };
}

/**
 * マスク処理を行う
 * @remarks
 * マスクパターンは 000 （市松模様）として固定
 * @param cellsWithFullData - 形式情報・データと誤り訂正符号を挿入した二次元コードのセル
 * @param orderArrayForData - データを埋める順番を示す配列
 * @returns `cellsWithFullData` にマスク処理を行った二次元コードのセル
 */
export function mask(
  cellsWithFullData: boolean[][],
  orderArrayForData: number[][],
) {
  const cells = cellsWithFullData;
  // マスク処理
  for (let i = 0; i < 26 * 8; ++i) {
    if ((orderArrayForData[i][0] + orderArrayForData[i][1]) % 2 === 0) {
      if (cells[orderArrayForData[i][0]][orderArrayForData[i][1]] === true) {
        cells[orderArrayForData[i][0]][orderArrayForData[i][1]] = false;
      } else {
        cells[orderArrayForData[i][0]][orderArrayForData[i][1]] = true;
      }
    }
  }
  return cells;
}

/**
 * 平文を符号化モードに応じて二次元コードのデータに変換する
 * @param inputText - 平文
 * @param mode - 符号化モード
 * @returns 二次元コードのセル
 */
export default function strTo2dBarcode(
  inputText: string,
  mode: EncodingMode,
): boolean[][] {
  const newCells: boolean[][] = new Array(21)
    .fill(false)
    .map(() => new Array(21).fill(false));
  const cellsWithFunctional = insertFunctionalPattern(newCells);
  const cellsWithFunctionalAndFormat = insertFormatInfo(cellsWithFunctional);
  const {
    cellsWithData: cellsWithFullData,
    orderArrayForData: orderArrayForData,
  } = insertEncodedData(cellsWithFunctionalAndFormat, inputText, mode);
  const maskedCells = mask(cellsWithFullData, orderArrayForData);
  return maskedCells;
}
