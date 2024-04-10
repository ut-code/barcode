import strToEisuData from "./utils/strToEisuData";
import strTo8bitData from "./utils/strTo8bitData";
import strToSjisData from "./utils/strToSjisData";
import makeOrderArrayForData from "./utils/makeOrderArrayForData";
import { EncodingMode } from "../types";

function encodeStrByMode(inputText: string, mode: EncodingMode) {
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

function insertFunctionalPattern(cells: boolean[][]) {
  // フォーマット情報を埋める
  for (let i = 0; i < 21; ++i) {
    for (let j = 0; j < 21; ++j) {
      //   二次元コードの初期状態
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

function insertFormat(cells: boolean[][]) {
  // 形式情報
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

function insertEncodedData(
  cells: boolean[][],
  bitData: bigint,
  errorCorrectionCode: bigint,
) {
  // データを埋めていく
  // データを埋める順番を示す配列を作成する。
  const orderArrayForData: number[][] = makeOrderArrayForData();

  // データを埋めていく
  const totalData = (bitData << BigInt(10 * 8)) + errorCorrectionCode;
  for (let i = 0; i < 26 * 8; ++i) {
    if ((totalData >> BigInt(26 * 8 - i - 1)) % BigInt(2) === BigInt(1)) {
      cells[orderArrayForData[i][0]][orderArrayForData[i][1]] = true;
    }
  }
  return { cellsWithData: cells, orderArrayForData: orderArrayForData };
}

function mask(cellsWithFullData: boolean[][], orderArrayForData: number[][]) {
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

export default function strTo2dBarcode(
  inputText: string,
  mode: EncodingMode,
): boolean[][] {
  const { bitData, errorCorrectionCode } = encodeStrByMode(inputText, mode);

  const newCells: boolean[][] = new Array(21)
    .fill(false)
    .map(() => new Array(21).fill(false));

  const cellsWithFunctional = insertFunctionalPattern(newCells);
  const cellsWithFunctionalAndFormat = insertFormat(cellsWithFunctional);
  const {
    cellsWithData: cellsWithFullData,
    orderArrayForData: orderArrayForData,
  } = insertEncodedData(
    cellsWithFunctionalAndFormat,
    bitData,
    errorCorrectionCode,
  );
  const maskedCells = mask(cellsWithFullData, orderArrayForData);
  return maskedCells;
}
