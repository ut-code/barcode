import { useEffect, useState } from "react";
import Playground from "../../Playground";
import stringToData from "../calculation/calculation";

interface SquareProps {
  x: number;
  y: number;
  fill: string;
  toggleFill: () => void;
  handleMouseEnter: () => void;
}

const Square = ({ x, y, fill, toggleFill, handleMouseEnter }: SquareProps) => (
  <rect
    x={x}
    y={y}
    width="20"
    height="20"
    fill={fill}
    stroke="lightgray"
    strokeWidth="0.1"
    onMouseDown={toggleFill}
    onMouseEnter={handleMouseEnter}
  />
);

const CreateAnswer = () => {
  const [squares, setSquares] = useState(() => {
    return Array(21).fill(Array(21).fill("white"));
  });

  const [isDragging, setIsDragging] = useState(false);

  const toggleFill = (rowIndex: number, colIndex: number) => {
    const newSquares = squares.map((row: string[], rIndex: number) =>
      rIndex === rowIndex
        ? row.map((col: string, cIndex: number) =>
            cIndex === colIndex ? (col === "white" ? "black" : "white") : col,
          )
        : row,
    );
    setSquares(newSquares);
  };

  const handleMouseDown = (rowIndex: number, colIndex: number) => {
    setIsDragging(true);
    toggleFill(rowIndex, colIndex);
  };

  const handleMouseEnter = (rowIndex: number, colIndex: number) => {
    if (isDragging) {
      toggleFill(rowIndex, colIndex);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    if (window.confirm("リセットします。よろしいですか？")) {
      setSquares(Array(21).fill(Array(21).fill("white")));
    }
  };

  const [stringForAnswer, setStringForAnswer] = useState<string>("");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStringForAnswer(e.target.value);
  };

  return (
    <>
      <Playground title="二次元コード">
        <div>
          <div>
            <div>文字を入れてみよう</div>
            <input
              type="text"
              id="string"
              value={stringForAnswer}
              onChange={handleNameChange}
            ></input>
            <button
              onClick={() => {
                stringToTwoDimensionalBarcode(
                  stringForAnswer,
                  squares,
                  setSquares,
                );
              }}
            >
              二次元コードを作成する
            </button>
          </div>
          <svg
            width="422"
            height="422"
            style={{
              // border: "1px solid black",
              background: "lightgray",
              margin: "50px",
            }}
            onMouseUp={handleMouseUp}
          >
            {squares.map((row: string[], rowIndex: number) =>
              row.map((_: string, colIndex: number) => (
                <Square
                  key={`${rowIndex}-${colIndex}`}
                  x={colIndex * 20 + 1}
                  y={rowIndex * 20 + 1}
                  fill={squares[rowIndex][colIndex]}
                  toggleFill={() => handleMouseDown(rowIndex, colIndex)}
                  handleMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                />
              )),
            )}
          </svg>
        </div>
        <button onClick={handleReset}>リセット</button>
      </Playground>
    </>
  );
};

export default CreateAnswer;

function stringToTwoDimensionalBarcode(
  string: string,
  squares: string[][],
  setSquares: React.Dispatch<React.SetStateAction<string[][]>>,
) {
  const data: bigint[] = stringToData(string);
  const bitData: bigint = data[0];
  const errorCorrectionCode: bigint = data[1];
  console.log("bitdata", bitData.toString(2));
  console.log("errorCorrectionCode", errorCorrectionCode.toString(2));

  const newSquares = squares.map((row: string[], rIndex: number) =>
    row.map((col: string, cIndex: number) => col),
  );
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
  const orderArrayForData = new Array(26 * 8).fill(Array(2).fill(0));
  let index = 0;
  for (let i = 20; i > 8; --i) {
    orderArrayForData[index] = [i, 20];
    ++index;
    orderArrayForData[index] = [i, 19];
    ++index;
  }
  for (let i = 9; i <= 20; ++i) {
    orderArrayForData[index] = [i, 18];
    ++index;
    orderArrayForData[index] = [i, 17];
    ++index;
  }
  for (let i = 20; i > 8; --i) {
    orderArrayForData[index] = [i, 16];
    ++index;
    orderArrayForData[index] = [i, 15];
    ++index;
  }
  for (let i = 9; i <= 20; ++i) {
    orderArrayForData[index] = [i, 14];
    ++index;
    orderArrayForData[index] = [i, 13];
    ++index;
  }

  for (let i = 20; i > 6; --i) {
    orderArrayForData[index] = [i, 12];
    ++index;
    orderArrayForData[index] = [i, 11];
    ++index;
  }
  for (let i = 5; i >= 0; --i) {
    orderArrayForData[index] = [i, 12];
    ++index;
    orderArrayForData[index] = [i, 11];
    ++index;
  }
  for (let i = 0; i <= 5; ++i) {
    orderArrayForData[index] = [i, 10];
    ++index;
    orderArrayForData[index] = [i, 9];
    ++index;
  }
  for (let i = 7; i <= 20; ++i) {
    orderArrayForData[index] = [i, 10];
    ++index;
    orderArrayForData[index] = [i, 9];
    ++index;
  }

  for (let i = 12; i > 8; --i) {
    orderArrayForData[index] = [i, 8];
    ++index;
    orderArrayForData[index] = [i, 7];
    ++index;
  }
  for (let i = 9; i <= 12; ++i) {
    orderArrayForData[index] = [i, 5];
    ++index;
    orderArrayForData[index] = [i, 4];
    ++index;
  }
  for (let i = 12; i > 8; --i) {
    orderArrayForData[index] = [i, 3];
    ++index;
    orderArrayForData[index] = [i, 2];
    ++index;
  }
  for (let i = 9; i <= 12; ++i) {
    orderArrayForData[index] = [i, 1];
    ++index;
    orderArrayForData[index] = [i, 0];
    ++index;
  }

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
