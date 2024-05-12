import { useEffect, useState } from "react";
import TwoDimBarcode from "../../TwoDimBarcode";
import { EncodingMode } from "../../types";
import strTo2dBarcode from "../../utils/strTo2dBarcode";
import Playground from "@site/src/components/Playground";
import createNewCells from "../../utils/createNewCells";

export default function CreateTwoDimBarcodePlayground() {
  const [cells, setCells] = useState<boolean[][]>(createNewCells());
  const [messageInput, setMessageInput] = useState<string>("");
  const [modeSelect, setModeSelect] = useState<EncodingMode>("eisu");
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  return (
    <Playground title="二次元コード">
      <p>文字を入れてみよう</p>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => {
          const input = e.target.value;
          setErrorMessage("");
          if (modeSelect == "eisu") {
            if (/^[A-Z0-9$%*+-./: ]*$/.test(input)) {
              setMessageInput(input);
            } else {
              setErrorMessage("規格に当てはまらない文字です。");
            }
          } else if (modeSelect == "8bit") {
            if (/^[\x00-\x7F]*$/.test(input)) {
              setMessageInput(input);
            } else {
              setErrorMessage("規格に当てはまらない文字です。");
            }
          } else if (modeSelect == "sjis") {
            setMessageInput(input);
          }
        }}
      />
      <select onChange={(e) => setModeSelect(e.target.value as EncodingMode)}>
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
      <p style={{ color: "red" }}>{errorMessage}</p>
      <TwoDimBarcode cells={cells} setCells={setCells} />
    </Playground>
  );
}
