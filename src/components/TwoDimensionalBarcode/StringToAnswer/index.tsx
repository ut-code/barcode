import { useState } from "react";
import Playground from "../../Playground";
import stringToTwoDimensionalBarcode from "../calculation/stringToTwoDimensionalBarcode";

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
    strokeWidth="0.05"
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
              // background: "lightgray",
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
