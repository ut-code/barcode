import Playground from "@site/src/components/Playground";
import { useEffect, useState } from "react";
import { EncodingMode } from "../../types";
import { encodeStrByMode } from "../../utils/strTo2dBarcode";

import styles from "./styles.module.css";

export function bigIntTo8bitStrBlocks(bigInt: BigInt): string[] {
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
        <select
          onChange={(e) => setModeSelect(e.target.value as EncodingMode)}
          className={styles.selectField}
        >
          <option value="eisu">英数字モード</option>
          <option value="sjis">8ビットバイトモード</option>
        </select>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => {
            const input = e.target.value;
            setErrorMessage("");
            if (modeSelect == "eisu") {
              if (/^[A-Z0-9$%*+-./: ]{0,20}$/.test(input)) {
                setMessageInput(input);
              } else {
                setErrorMessage(
                  "英数字モードでは、大文字のアルファベット・数字・一部の記号が使用できます。また、20文字以内で入力してください。",
                );
              }
            }
            if (modeSelect == "sjis") {
              if (/^.{0,14}$/.test(input)) {
                setMessageInput(input);
              } else {
                setErrorMessage(
                  "8ビットバイトモードでは、14文字以内で入力してください。",
                );
              }
            }
          }}
          className={styles.inputField}
        />
        <button
          onClick={() => {
            setCode(encodeStrByMode(messageInput, modeSelect).bitData);
          }}
          className={styles.primaryButton}
        >
          コードを生成
        </button>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <table>
          <tbody>
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
          </tbody>
        </table>
      </div>
    </Playground>
  );
}
