import { useEffect, useState } from "react";
import createNewCells from "./utils/createNewCells";
import {
  insertEncodedData,
  insertFormatInfo,
  insertFunctionalPattern,
  mask,
} from "./utils/strTo2dBarcode";
import { EnabledButton, EncodingMode } from "./types";
import { bigIntTo8bitStr128Blocks } from "./features/EncodingPlayground";
import { bigIntTo8bitStr80Blocks } from "./features/ErrorCorrectionPlayground";
import { isBlockValid } from "./utils/isBlockValid";

import styles from "./styles.module.css";

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
 * @param props.enabledButton 有効化するボタン
 * @returns 二次元コードとその操作用のボタン
 */
export default function TwoDimBarcode({
  enabledButton,
}: {
  enabledButton: EnabledButton;
}) {
  const [currentCells, setCurrentCells] =
    useState<boolean[][]>(createNewCells());
  const [undoStack, setUndoStack] = useState<boolean[][][]>([]);
  const [redoStack, setRedoStack] = useState<boolean[][][]>([]);

  const [message, setMessage] = useState<string>("");
  const [mode, setMode] = useState<EncodingMode>("eisu");
  const [orderArrayForData, setOrderArrayForData] = useState<number[][]>([]);

  const [code, setCode] = useState<BigInt>(BigInt(0));
  const [errCorrect, setErrCorrect] = useState<BigInt>(BigInt(0));

  function setCells(newCells: boolean[][]) {
    setUndoStack([...undoStack, currentCells]);
    setCurrentCells(newCells);
    setRedoStack([]);
  }

  function undoCells() {
    const newUndoStack = [...undoStack];
    const newCurrentCells = newUndoStack.pop();
    if (newCurrentCells === undefined) {
      return;
    }
    setRedoStack([...redoStack, currentCells]);
    setCurrentCells(newCurrentCells);
    setUndoStack(newUndoStack);
  }

  function redoCells() {
    const newRedoStack = [...redoStack];
    const newCurrentCells = newRedoStack.pop();
    if (newCurrentCells === undefined) {
      return;
    }
    setUndoStack([...undoStack, currentCells]);
    setCurrentCells(newCurrentCells);
    setRedoStack(newRedoStack);
  }

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
    const codeValue = localStorage.getItem("2dBarCodeBinaryCode");
    if (codeValue) {
      setCode(BigInt(codeValue));
    }
    const errCorrectionValue = localStorage.getItem(
      "2dBarCodeBinaryErrCorrect",
    );
    if (errCorrectionValue) {
      setErrCorrect(BigInt(errCorrectionValue));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("2dBarCodeCells", JSON.stringify(currentCells));
  }, [currentCells]);

  useEffect(() => {
    localStorage.setItem(
      "2dBarCodeOrderArrayForData",
      JSON.stringify(orderArrayForData),
    );
  }, [orderArrayForData]);

  useEffect(() => {
    localStorage.setItem("2dBarCodeBinaryCode", code.toString());
  }, [code]);

  useEffect(() => {
    localStorage.setItem("2dBarCodeBinaryErrCorrect", errCorrect.toString());
  }, [errCorrect]);

  useEffect(() => {
    localStorage.setItem("2dBarCodeMessage", message);
  }, [message]);

  useEffect(() => {
    localStorage.setItem("2dBarCodeMode", mode);
  }, [mode]);

  const [isDragging, setIsDragging] = useState(false);

  const toggleCellColor = (targetRowIndex: number, targetColIndex: number) => {
    const newCells = currentCells.map((row: boolean[], rowIndex: number) =>
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
    if (window.confirm("入力した情報を全てリセットします。よろしいですか？")) {
      setCells(createNewCells());
      setCode(BigInt(0));
      setErrCorrect(BigInt(0));
      setMessage("");
      setMode("eisu");
      setOrderArrayForData([]);
    }
  };

  const allCodes = bigIntTo8bitStr128Blocks(code).concat(
    bigIntTo8bitStr80Blocks(errCorrect),
  );
  const isBlockValidResult = isBlockValid(allCodes, currentCells);
  return (
    <>
      <div>
        <div>
          <div style={{ margin: "4px 0" }}>
            {enabledButton === "insertFunctionalPattern" && (
              <button
                onClick={() => {
                  setCells(insertFunctionalPattern(createNewCells()));
                }}
                className={styles.primaryButton}
              >
                機能パターンを挿入
              </button>
            )}
            {enabledButton === "insertData" && (
              <button
                onClick={() => {
                  const { cellsWithData, orderArrayForData } =
                    insertEncodedData(currentCells, message, mode);
                  setCells(cellsWithData);
                  setOrderArrayForData(orderArrayForData);
                }}
                className={styles.primaryButton}
              >
                入力をスキップ
              </button>
            )}
            {enabledButton === "mask" && (
              <button
                onClick={() => {
                  setCells(mask(currentCells, orderArrayForData));
                }}
                className={styles.primaryButton}
              >
                マスクをかける
              </button>
            )}
            {enabledButton === "insertFormatInfo" && (
              <button
                onClick={() => {
                  setCells(insertFormatInfo(currentCells));
                }}
                className={styles.primaryButton}
              >
                形式情報を入力
              </button>
            )}
            <button
              onClick={undoCells}
              disabled={!(undoStack.length > 0)}
              className={styles.normalButton}
            >
              1つ戻る
            </button>
            <button
              onClick={redoCells}
              disabled={!(redoStack.length > 0)}
              className={styles.normalButton}
            >
              1つ進む
            </button>
            <button onClick={handleReset} className={styles.normalButton}>
              リセット
            </button>
          </div>
        </div>
        <svg
          width="422"
          height="422"
          style={{ border: "1px solid black", background: "lightgray" }}
          onMouseUp={handleMouseUp}
        >
          {currentCells.map((row: boolean[], rowIndex: number) =>
            row.map((_: boolean, colIndex: number) => (
              <CellRect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex * 20 + 1}
                y={rowIndex * 20 + 1}
                fill={currentCells[rowIndex][colIndex] ? "black" : "white"}
                toggleFill={() => handleMouseDown(rowIndex, colIndex)}
                handleMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              />
            )),
          )}
        </svg>
      </div>
      {enabledButton === "insertData" && (
        <table>
          <tbody>
            <tr>
              <th>コード</th>
              <th>入力状態</th>
            </tr>
            {allCodes.map((block, index) => {
              return (
                <tr key={index} style={{ height: "10px" }}>
                  <td>
                    <code>{block}</code>
                  </td>
                  <td>{isBlockValidResult[index] ? "Good!" : "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
