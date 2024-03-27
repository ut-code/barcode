import stringToData from "./strungToData";
import makeOrderArrayForData from "../calculation/ makeOrderArrayForData";

export default function stringToTwoDimensionalBarcode(
  string: string,
  squares: string[][],
  setSquares: React.Dispatch<React.SetStateAction<string[][]>>,
) {
  const data: bigint[] = stringToData(string);
  const bitData: bigint = data[0];
  const errorCorrectionCode: bigint = data[1];
  // console.log("bitdata", bitData.toString(2));
  // console.log("errorCorrectionCode", errorCorrectionCode.toString(2));

  // 初期化
  const newSquares = squares.map((row: string[], rIndex: number) =>
    row.map((col: string, cIndex: number) => col),
  );
  for (let i = 0; i < 21; ++i) {
    for (let j = 0; j < 21; ++j) {
      newSquares[i][j] = "white";
    }
  }
  setSquares(newSquares);

  for (let i = 0; i < 21; ++i) {
    for (let j = 0; j < 21; ++j) {
      //   二次元コードの初期状態
      if (i === 0 || i === 6) {
        if ((j >= 0 && j < 7) || (j >= 14 && j < 21)) {
          newSquares[i][j] = "black";
        }
      } else if (j === 0 || j === 6) {
        if ((i >= 0 && i < 7) || (i >= 14 && i < 21)) {
          newSquares[i][j] = "black";
        }
      }

      if (i === 14 || i === 20) {
        if (j >= 0 && j < 7) {
          newSquares[i][j] = "black";
        }
      } else if (j === 14 || j === 20) {
        if (i >= 0 && i < 7) {
          newSquares[i][j] = "black";
        }
      }

      if (
        (i >= 2 && i < 5 && j >= 2 && j < 5) ||
        (i >= 2 && i < 5 && j >= 16 && j < 19) ||
        (i >= 16 && i < 19 && j >= 2 && j < 5)
      ) {
        newSquares[i][j] = "black";
      }

      if ((i === 6 && j % 2 === 0) || (j === 6 && i % 2 === 0)) {
        newSquares[i][j] = "black";
      }

      newSquares[13][8] = "black";

      //   形式情報
      const formatInformation: number = parseInt("101010000010010", 2);
      if (j === 8 && i < 8) {
        if (i < 6) {
          if ((formatInformation >> i) % 2 === 1) {
            newSquares[i][j] = "black";
          }
        } else if (i > 6) {
          if ((formatInformation >> (i - 1)) % 2 === 1) {
            newSquares[i][j] = "black";
          }
        }
      } else if (j === 8 && i > 13) {
        if ((formatInformation >> (i - 6)) % 2 === 1) {
          newSquares[i][j] = "black";
        }
      } else if (i === 8 && j < 8) {
        if (j < 6) {
          if ((formatInformation >> (14 - j)) % 2 === 1) {
            newSquares[i][j] = "black";
          }
        } else if (j > 6) {
          if ((formatInformation >> (15 - j)) % 2 === 1) {
            newSquares[i][j] = "black";
          }
        }
      } else if (i === 8 && j > 13) {
        if ((formatInformation >> (20 - j)) % 2 === 1) {
          newSquares[i][j] = "black";
        }
      }
    }
  }

  // データを埋めていく
  // データを埋める順番を示す配列を作成する。
  const orderArrayForData: number[][] = makeOrderArrayForData();

  // データを埋めていく
  const totalData = (bitData << BigInt(10 * 8)) + errorCorrectionCode;
  for (let i = 0; i < 26 * 8; ++i) {
    if ((totalData >> BigInt(26 * 8 - i - 1)) % BigInt(2) === BigInt(1)) {
      newSquares[orderArrayForData[i][0]][orderArrayForData[i][1]] = "black";
    }
  }

  // 反転処理
  for (let i = 0; i < 26 * 8; ++i) {
    if ((orderArrayForData[i][0] + orderArrayForData[i][1]) % 2 === 0) {
      if (
        newSquares[orderArrayForData[i][0]][orderArrayForData[i][1]] === "black"
      ) {
        newSquares[orderArrayForData[i][0]][orderArrayForData[i][1]] = "white";
      } else {
        newSquares[orderArrayForData[i][0]][orderArrayForData[i][1]] = "black";
      }
    }
  }
  setSquares(newSquares);
}
