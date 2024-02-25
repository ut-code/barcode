import { useState } from "react";
import {
  calculateLeftHalfDigit,
  calculateRightHalfDigit,
} from "../LinearBarcodeEAN13/calculateDigits";
import { SymbolCharacter } from "../LinearBarcodeEAN13/types";
import Playground from "../../Playground";
import styles from "./index.module.css";

function createDigit(
  moduleCharacters: SymbolCharacter,
  isLeft: boolean,
): number | null {
  try {
    return isLeft
      ? calculateLeftHalfDigit(moduleCharacters)
      : calculateRightHalfDigit(moduleCharacters);
  } catch {
    return null;
  }
}

export default function CreateSymbolCharacterPlayground({
  isLeft,
}: {
  isLeft: boolean;
}): JSX.Element {
  const [moduleCharacters, setModuleCharacters] = useState<SymbolCharacter>(
    isLeft
      ? [false, false, false, true, true, false, true]
      : [true, true, true, false, false, true, false],
  );
  const digit = createDigit(moduleCharacters, isLeft);

  return (
    <Playground title={`${isLeft ? "左" : "右"}側のキャラクタ`}>
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
        {digit !== null
          ? `キャラクタは${digit}です。`
          : "不正なキャラクタです。"}
      </div>
    </Playground>
  );
}
