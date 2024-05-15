import { useEffect, useState } from "react";
import createNewCells from "./utils/createNewCells";
import {
  insertEncodedData,
  insertFormatInfo,
  insertFunctionalPattern,
  mask,
} from "./utils/strTo2dBarcode";
import { EncodingMode } from "./types";

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

/**
 * 二次元コードとその操作用のボタン
 * @returns 二次元コードとその操作用のボタン
 */
export default function TwoDimBarcode() {
  const [cells, setCells] = useState<boolean[][]>(createNewCells());
  const [message, setMessage] = useState<string>("");
  const [mode, setMode] = useState<EncodingMode>("eisu");
  const [orderArrayForData, setOrderArrayForData] = useState<number[][]>([]);

  useEffect(() => {
    // docusaurus の SSR への対応
    const value = localStorage.getItem("2dBarCodeCells");
    if (value) {
      setCells(JSON.parse(value));
    }
    const messageValue = localStorage.getItem("2dBarCodeMessage");
    if (messageValue) {
      setMessage(messageValue);
    }
    const modeValue = localStorage.getItem("2dBarCodeMode");
    if (modeValue) {
      setMode(modeValue as EncodingMode);
    }
    const orderArrayForDataValue = localStorage.getItem(
      "2dBarCodeOrderArrayForData",
    );
    if (orderArrayForDataValue) {
      setOrderArrayForData(JSON.parse(orderArrayForDataValue));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("2dBarCodeCells", JSON.stringify(cells));
  }, [cells]);

  useEffect(() => {
    localStorage.setItem(
      "2dBarCodeOrderArrayForData",
      JSON.stringify(orderArrayForData),
    );
  }, [orderArrayForData]);

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
        <button
          onClick={() => {
            setCells(insertFunctionalPattern(createNewCells()));
          }}
        >
          機能パターンを挿入
        </button>
        <button
          onClick={() => {
            const { cellsWithData, orderArrayForData } = insertEncodedData(
              cells,
              message,
              mode,
            );
            setCells(cellsWithData);
            setOrderArrayForData(orderArrayForData);
          }}
        >
          入力をスキップ
        </button>
        <button
          onClick={() => {
            setCells(mask(cells, orderArrayForData));
          }}
        >
          マスクをかける
        </button>
        <button
          onClick={() => {
            setCells(insertFormatInfo(cells));
          }}
        >
          形式情報を入力
        </button>
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
