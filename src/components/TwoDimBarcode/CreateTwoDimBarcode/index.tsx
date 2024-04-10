import { useEffect, useState } from "react";
import Playground from "../../Playground";
import strTo2dBarcode from "../calculation/strTo2dBarcode";
import { EncodingMode } from "../types";

interface CellRectProps {
  x: number;
  y: number;
  fill: string;
  toggleFill: () => void;
  handleMouseEnter: () => void;
}

const CellRect = ({
  x,
  y,
  fill,
  toggleFill,
  handleMouseEnter,
}: CellRectProps) => (
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

const CreateTwoDimBarcode = () => {
  const [cells, setCells] = useState<boolean[][]>(
    new Array(21).fill(false).map(() => new Array(21).fill(false)),
  );
  const [isDragging, setIsDragging] = useState(false);
  const [messageInput, setMessageInput] = useState<string>("");
  const [modeSelect, setModeSelect] = useState<EncodingMode>("eisu");

  useEffect(() => {
    // docusaurus の SSR への対応
    const value = localStorage.getItem("2dBarCodeCells");
    if (value) {
      setCells(JSON.parse(value));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("2dBarCodeCells", JSON.stringify(cells));
  }, [cells]);

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
      setCells(new Array(21).fill(false).map(() => new Array(21).fill(false)));
    }
  };

  return (
    <>
      <Playground title="二次元コード">
        <div>
          <div>
            <p>文字を入れてみよう</p>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => {
                setMessageInput(e.target.value);
              }}
            />
            <select
              onChange={(e) => setModeSelect(e.target.value as EncodingMode)}
            >
              <option value="eisu">英数字モード</option>
              <option value="8bit">8bitバイトモード</option>
              <option value="sjis">shiftJISモード</option>
            </select>
            <button
              onClick={() => {
                setCells(strTo2dBarcode(messageInput, modeSelect));
              }}
            >
              二次元コードを作成
            </button>
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
        <button onClick={handleReset}>リセット</button>
      </Playground>
    </>
  );
};

export default CreateTwoDimBarcode;
