import Playground from "@site/src/components/Playground";
import { useEffect, useState } from "react";
import { EncodingMode } from "../../types";
import { encodeStrByMode } from "../../utils/strTo2dBarcode";

function bigIntTo8bitStrBlocks(bigInt: BigInt): string[] {
  const blocks: string[] = [];
  const strData = bigInt.toString(2);
  for (let i = 0; i < strData.length; i += 8) {
    blocks.push(strData.slice(i, i + 8));
  }
  return blocks;
}

export default function EncodingPlayground() {
  const mockData = BigInt("0b" + "10101010".repeat(16));
  const [code, setCode] = useState<BigInt>(mockData);
  const [messageInput, setMessageInput] = useState<string>("");
  const [modeSelect, setModeSelect] = useState<EncodingMode>("eisu");

  useEffect(() => {
    // docusaurus の SSR への対応
    const value = localStorage.getItem("2dBarCodeBinaryCode");
    if (value) {
      setCode(BigInt(value));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("2dBarCodeBinaryCode", "0b" + code.toString(2));
  }, [code]);

  return (
    <Playground title="符号化">
      <div>
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
          <option value="sjis">Shift_JISモード</option>
        </select>
        <button
          onClick={() => {
            setCode(encodeStrByMode(messageInput, modeSelect).bitData);
          }}
        >
          コードを生成
        </button>
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
