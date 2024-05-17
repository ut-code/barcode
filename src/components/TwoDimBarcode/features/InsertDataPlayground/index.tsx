import TwoDimBarcode from "../../TwoDimBarcode";
import Playground from "@site/src/components/Playground";
import { bigIntTo8bitStrBlocks } from "../EncodingPlayground";
import { useEffect, useState } from "react";

export default function InsertDataPlayground() {
  const [code, setCode] = useState<BigInt>(BigInt(0));
  const [errCorrect, setErrCorrect] = useState<BigInt>(BigInt(0));
  useEffect(() => {
    // docusaurus の SSR への対応
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
  return (
    <Playground title="データを入力">
      <p>データを入力していこう</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TwoDimBarcode enabledButton={"insertData"} />
        <table>
          <tbody>
            {bigIntTo8bitStrBlocks(code)
              .concat(bigIntTo8bitStrBlocks(errCorrect))
              .map((block, index) => {
                return (
                  <tr key={index} style={{ height: "10px" }}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <code>{block}</code>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Playground>
  );
}
