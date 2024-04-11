import { useState } from "react";
import TwoDimBarcode from "../..";
import { EncodingMode } from "../../types";
import strTo2dBarcode from "../../utils/strTo2dBarcode";
import Playground from "@site/src/components/Playground";

export default function CreateTwoDimBarcodePlayground() {
  const [messageInput, setMessageInput] = useState<string>("");
  const [modeSelect, setModeSelect] = useState<EncodingMode>("eisu");

  return (
    <Playground title="二次元コード">
      <p>文字を入れてみよう</p>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => {
          setMessageInput(e.target.value);
        }}
      />
      <select onChange={(e) => setModeSelect(e.target.value as EncodingMode)}>
        <option value="eisu">英数字モード</option>
        <option value="8bit">8bitバイトモード</option>
        <option value="sjis">shiftJISモード</option>
      </select>
      <TwoDimBarcode
        buttonText="二次元コードを作成"
        buttonOnClick={() => {
          return strTo2dBarcode(messageInput, modeSelect);
        }}
      />
    </Playground>
  );
}
