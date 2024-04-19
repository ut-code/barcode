import { useEffect, useState } from "react";
import TwoDimBarcode from "../../TwoDimBarcode";
import { EncodingMode } from "../../types";
import Playground from "@site/src/components/Playground";
import createNewCells from "../../utils/createNewCells";
import { insertEncodedData } from "../../utils/strTo2dBarcode";

export default function InsertDataPlayground() {
  const [cells, setCells] = useState<boolean[][]>(createNewCells());
  const [message, setMessage] = useState<string>("");
  const [mode, setMode] = useState<EncodingMode>("eisu");
  const [orderArrayForData, setOrderArrayForData] = useState<number[][]>([]);

  useEffect(() => {
    // docusaurus の SSR への対応
    const cellsValue = localStorage.getItem("2dBarCodeCells");
    if (cellsValue) {
      setCells(JSON.parse(cellsValue));
    }
    const messageValue = localStorage.getItem("2dBarCodeMessage");
    if (messageValue) {
      setMessage(messageValue);
    }
    const modeValue = localStorage.getItem("2dBarCodeMode");
    if (modeValue) {
      setMode(modeValue as EncodingMode);
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

  return (
    <Playground title="データを入力">
      <p>データを入力していこう</p>
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
      <TwoDimBarcode cells={cells} setCells={setCells} />
    </Playground>
  );
}
