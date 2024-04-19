import { useState } from "react";
import createNewCells from "./utils/createNewCells";

interface CellRectProps {
  x: number;
  y: number;
  fill: string;
  toggleFill: () => void;
  handleMouseEnter: () => void;
}

function CellRect({ x, y, fill, toggleFill, handleMouseEnter }: CellRectProps) {
  return (
    <rect
      x={x}
      y={y}
      width="20"
      height="20"
      fill={fill}
      stroke="lightgray"
      strokeWidth="0.5"
      onMouseDown={toggleFill}
      onMouseEnter={handleMouseEnter}
    />
  );
}

interface TwoDimBarcodeProps {
  cells: boolean[][];
  setCells: (cells: boolean[][]) => void;
}

/**
 * 二次元コードとその操作用のボタン
 * @param props.cells 二次元コードのセルの `state`
 * @param props.setCells `state` の更新関数
 * @returns 二次元コードとその操作用のボタン
 */
export default function TwoDimBarcode({ cells, setCells }: TwoDimBarcodeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const toggleCellColor = (targetRowIndex: number, targetColIndex: number) => {
    const newCells = cells.map((row: boolean[], rowIndex: number) =>
      rowIndex === targetRowIndex
        ? row.map((isBlack: boolean, colIndex: number) =>
            colIndex === targetColIndex ? !isBlack : isBlack,
          )
        : row,
    );
    setCells(newCells);
  };

  const handleMouseDown = (rowIndex: number, colIndex: number) => {
    setIsDragging(true);
    toggleCellColor(rowIndex, colIndex);
  };

  const handleMouseEnter = (rowIndex: number, colIndex: number) => {
    if (isDragging) {
      toggleCellColor(rowIndex, colIndex);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    if (window.confirm("リセットします。よろしいですか？")) {
      setCells(createNewCells());
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleReset}>リセット</button>
      </div>
      <svg
        width="422"
        height="422"
        style={{ border: "1px solid black", background: "lightgray" }}
        onMouseUp={handleMouseUp}
      >
        {cells.map((row: boolean[], rowIndex: number) =>
          row.map((_: boolean, colIndex: number) => (
            <CellRect
              key={`${rowIndex}-${colIndex}`}
              x={colIndex * 20 + 1}
              y={rowIndex * 20 + 1}
              fill={cells[rowIndex][colIndex] ? "black" : "white"}
              toggleFill={() => handleMouseDown(rowIndex, colIndex)}
              handleMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
            />
          )),
        )}
      </svg>
    </div>
  );
}
