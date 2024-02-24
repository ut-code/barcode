import { useState } from "react";
import { calculateNumberSetType } from "../LinearBarcodeEAN13/calculateDigits";
import { SymbolCharacter } from "../LinearBarcodeEAN13/types";
import Playground from "../../Playground";
import styles from "./index.module.css";

function createNumberSetType(
  moduleCharacters: SymbolCharacter,
): "A" | "B" | null {
  try {
    return calculateNumberSetType(moduleCharacters);
  } catch {
    return null;
  }
}

export default function CalculateNumberSetTypePlayground(): JSX.Element {
  const [moduleCharacters, setModuleCharacters] = useState<SymbolCharacter>([
    false,
    false,
    false,
    true,
    true,
    false,
    true,
  ]);
  const numberSetType = createNumberSetType(moduleCharacters);

  return (
    <Playground title="セット">
      <svg viewBox="0 0 70 20" className={styles.symbolCharacterContainer}>
        {moduleCharacters.map((moduleCharacter, index) => (
          <rect
            key={index}
            x={index * 10}
            y="0"
            width="10"
            height="20"
            fill={moduleCharacter ? "black" : "white"}
            stroke="black"
            onClick={() => {
              const newModuleCharacters: SymbolCharacter = [
                ...moduleCharacters,
              ];
              newModuleCharacters[index] = !moduleCharacter;
              setModuleCharacters(newModuleCharacters);
            }}
          />
        ))}
      </svg>
      <div>
        {numberSetType !== null
          ? `セットは${numberSetType}です。`
          : "不正なモジュールパターンです。"}
      </div>
    </Playground>
  );
}
