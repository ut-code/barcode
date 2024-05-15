import Playground from "@site/src/components/Playground";
import { useEffect, useState } from "react";
import { EncodingMode } from "../../types";
import { encodeStrByMode } from "../../utils/strTo2dBarcode";

function bigIntTo8bitStrBlocks(bigInt: BigInt): string[] {
  const blocks: string[] = [];
  const strData = bigInt.toString(2).padStart(128, "0");
  for (let i = 0; i < strData.length; i += 8) {
    blocks.push(strData.slice(i, i + 8));
  }
  return blocks;
}

export default function EncodingPlayground() {
  const [code, setCode] = useState<BigInt>(BigInt(0));
  const [messageInput, setMessageInput] = useState<string>("");
  const [modeSelect, setModeSelect] = useState<EncodingMode>("eisu");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // docusaurus の SSR への対応
    const value = localStorage.getItem("2dBarCodeBinaryCode");
    if (value) {
      setCode(BigInt(value));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("2dBarCodeBinaryCode", "0b" + code.toString(2));
    localStorage.setItem("2dBarCodeMessage", messageInput);
    localStorage.setItem("2dBarCodeMode", modeSelect);
  }, [code]);

  return (
    <Playground title="符号化">
      <div>
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
          <option value="sjis">Shift_JISモード</option>
        </select>
        <button
          onClick={() => {
            setCode(encodeStrByMode(messageInput, modeSelect).bitData);
          }}
        >
          コードを生成
        </button>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <table>
          {bigIntTo8bitStrBlocks(code).map((block, index) => {
            return (
              <tr key={index}>
                <td>
                  <code>{block}</code>
                </td>
                <td>{parseInt(block, 2)}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </Playground>
  );
}
