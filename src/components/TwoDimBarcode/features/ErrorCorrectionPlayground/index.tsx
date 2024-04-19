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

export default function ErrorCorrectionPlayground() {
  const [code, setCode] = useState<BigInt>(BigInt(0));
  const [message, setMessage] = useState<string>("");
  const [mode, setMode] = useState<EncodingMode>("eisu");

  useEffect(() => {
    // docusaurus の SSR への対応
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
    localStorage.setItem("2dBarCodeBinaryErrCorrect", "0b" + code.toString(2));
  }, [code]);

  return (
    <Playground title="誤り訂正">
      <div>
        <button
          onClick={() => {
            setCode(encodeStrByMode(message, mode).errorCorrectionCode);
          }}
        >
          誤り訂正を生成
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
