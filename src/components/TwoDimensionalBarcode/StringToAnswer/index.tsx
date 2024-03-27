import { useState } from "react";
import Playground from "../../Playground";
import stringToTwoDimensionalBarcode from "../calculation/stringToTwoDimensionalBarcode";

interface SquareProps {
  x: number;
  y: number;
  fill: string;
}

const Square = ({ x, y, fill }: SquareProps) => (
  <rect
    x={x}
    y={y}
    width="20"
    height="20"
    fill={fill}
    stroke="lightgray"
    strokeWidth="0.05"
  />
);

const CreateAnswer = () => {
  const [squares, setSquares] = useState(() => {
    return Array(21).fill(Array(21).fill("white"));
  });

  const [isDragging, setIsDragging] = useState(false);

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
              margin: "50px",
            }}
          >
            {squares.map((row: string[], rowIndex: number) =>
              row.map((_: string, colIndex: number) => (
                <Square
                  key={`${rowIndex}-${colIndex}`}
                  x={colIndex * 20 + 1}
                  y={rowIndex * 20 + 1}
                  fill={squares[rowIndex][colIndex]}
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
