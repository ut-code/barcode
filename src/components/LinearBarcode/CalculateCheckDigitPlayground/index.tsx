import { useState } from "react";
import { calculateCheckDigit } from "../LinearBarcodeEAN13/checkDigits";
import Playground from "../../Playground";
import LinearBarcodeEAN13 from "../LinearBarcodeEAN13";
import styles from "./index.module.css";

export default function CalculateCheckDigitPlayground(): JSX.Element {
  const [dataCharacters, setDataCharacters] = useState<number[]>(
    LinearBarcodeEAN13.getDefaultDataCharacters(),
  );
  const checkDigit = calculateCheckDigit(dataCharacters);

  return (
    <Playground title="チェックデジット">
      <div className={styles.inputGroup}>
        {dataCharacters.map((dataCharacter, index) => (
          <div key={index} className={styles.inputContainer}>
            <span className={styles.inputLabel}>{index + 1}番目</span>
            <input
              type="number"
              value={dataCharacter}
              onChange={(event) => {
                const newDataCharacters = [...dataCharacters];
                newDataCharacters[index] = parseInt(event.target.value);
                setDataCharacters(newDataCharacters);
              }}
              className={styles.inputField}
            />
          </div>
        ))}
      </div>
      <div>チェックデジットは、{checkDigit}です。</div>
    </Playground>
  );
}
