import { useState } from "react";
import Playground from "../../Playground";
import LinearBarcodeEAN13 from "../LinearBarcodeEAN13";
import styles from "./index.module.css";

function createLinearBarcodeEAN13Instance(
  dataCharacters: number[],
): LinearBarcodeEAN13 | null {
  try {
    return new LinearBarcodeEAN13(dataCharacters);
  } catch {
    return null;
  }
}

export default function CreateLinearBarcodeFromDigitsPlayground(): JSX.Element {
  const [dataCharacters, setDataCharacters] = useState<number[]>(
    LinearBarcodeEAN13.getDefaultDataCharacters(),
  );
  const linearBarcodeEAN13 = createLinearBarcodeEAN13Instance(dataCharacters);

  return (
    <Playground title="Create Linear Barcode From Digits">
      <div className={styles.dataCharactersContainer}>
        {dataCharacters.map((dataCharacter, index) => (
          <input
            key={index}
            type="number"
            min="0"
            max="9"
            step="1"
            value={dataCharacter}
            onChange={(event) => {
              const newDigits = [...dataCharacters];
              newDigits[index] = parseInt(event.target.value);
              setDataCharacters(newDigits);
            }}
            className={styles.inputField}
          />
        ))}
      </div>
      <div className={styles.linearBarcode}>
        {linearBarcodeEAN13 !== null
          ? linearBarcodeEAN13.render()
          : "Invalid digits"}
      </div>
    </Playground>
  );
}
