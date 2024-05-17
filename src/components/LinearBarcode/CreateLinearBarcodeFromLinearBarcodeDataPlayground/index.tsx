import { useState } from "react";
import LinearBarcodeEAN13 from "../LinearBarcodeEAN13";
import {
  LinearBarcodeData,
  SymbolCharacter,
} from "../LinearBarcodeEAN13/types";
import {
  calculateLeftHalfDigit,
  calculateNumberSetType,
  calculateRightHalfDigit,
} from "../LinearBarcodeEAN13/calculateDigits";
import Playground from "../../Playground";
import styles from "./index.module.css";

function createLeftHalfDigit(symbolCharacter: SymbolCharacter): number | null {
  try {
    return calculateLeftHalfDigit(symbolCharacter);
  } catch {
    return null;
  }
}

function createRightHalfDigit(symbolCharacter: SymbolCharacter): number | null {
  try {
    return calculateRightHalfDigit(symbolCharacter);
  } catch {
    return null;
  }
}

function createNumberSetType(
  symbolCharacter: SymbolCharacter,
): "A" | "B" | null {
  try {
    return calculateNumberSetType(symbolCharacter);
  } catch {
    return null;
  }
}

function createLinearBarcodeEAN13Instance(
  linearBarcodeData: LinearBarcodeData,
): LinearBarcodeEAN13 | null {
  try {
    return new LinearBarcodeEAN13(linearBarcodeData);
  } catch {
    return null;
  }
}

export default function CreateLinearBarcodeFromLinearBarcodeDataPlayground(): JSX.Element {
  const [leftHalfSymbolCharacters, setLeftHalfSymbolCharacters] = useState(
    LinearBarcodeEAN13.getDefaultLinearBarcodeData().leftHalfSymbolCharacters,
  );
  const [rightHalfSymbolCharacters, setRightHalfSymbolCharacters] = useState(
    LinearBarcodeEAN13.getDefaultLinearBarcodeData().rightHalfSymbolCharacters,
  );
  const linearBarcodeEAN13 = createLinearBarcodeEAN13Instance({
    leftHalfSymbolCharacters,
    rightHalfSymbolCharacters,
  });

  return (
    <Playground title="バーコード">
      <div className={styles.symbolCharactersContainer}>
        {leftHalfSymbolCharacters.map(
          (symbolCharacter, symbolCharacterIndex) => {
            const leftHalfDigit = createLeftHalfDigit(symbolCharacter);
            const numberSetType = createNumberSetType(symbolCharacter);

            return (
              <div key={symbolCharacterIndex}>
                <div className={styles.symbolCharacterLabel}>
                  {symbolCharacterIndex + 1}文字目
                </div>
                <svg viewBox="0 0 70 20">
                  {symbolCharacter.map(
                    (moduleCharacter, moduleCharacterIndex) => (
                      <rect
                        key={moduleCharacterIndex}
                        x={moduleCharacterIndex * 10}
                        y="0"
                        width="10"
                        height="20"
                        fill={moduleCharacter ? "black" : "white"}
                        stroke="black"
                        onClick={() => {
                          const newLeftHalfSymbolCharacters: LinearBarcodeData["leftHalfSymbolCharacters"] =
                            [...leftHalfSymbolCharacters];
                          newLeftHalfSymbolCharacters[symbolCharacterIndex] = [
                            ...symbolCharacter,
                          ];
                          newLeftHalfSymbolCharacters[symbolCharacterIndex][
                            moduleCharacterIndex
                          ] = !moduleCharacter;
                          setLeftHalfSymbolCharacters(
                            newLeftHalfSymbolCharacters,
                          );
                        }}
                      />
                    ),
                  )}
                </svg>
                <div className={styles.dataCharacterInfo}>
                  {leftHalfDigit !== null
                    ? `数字 ${leftHalfDigit}`
                    : "不正なキャラクタです。"}
                </div>
                <div className={styles.numberSetTypeInfo}>
                  {numberSetType !== null
                    ? `ナンバーセット${numberSetType}`
                    : "不正なキャラクタです。"}
                </div>
              </div>
            );
          },
        )}
        {rightHalfSymbolCharacters.map(
          (symbolCharacter, symbolCharacterIndex) => {
            const rightHalfDigit = createRightHalfDigit(symbolCharacter);

            return (
              <div key={symbolCharacterIndex}>
                <div className={styles.symbolCharacterLabel}>
                  {symbolCharacterIndex + 7}文字目
                </div>
                <svg viewBox="0 0 70 20">
                  {symbolCharacter.map(
                    (moduleCharacter, moduleCharacterIndex) => (
                      <rect
                        key={moduleCharacterIndex}
                        x={moduleCharacterIndex * 10}
                        y="0"
                        width="10"
                        height="20"
                        fill={moduleCharacter ? "black" : "white"}
                        stroke="black"
                        onClick={() => {
                          const newRightHalfSymbolCharacters: LinearBarcodeData["rightHalfSymbolCharacters"] =
                            [...rightHalfSymbolCharacters];
                          newRightHalfSymbolCharacters[symbolCharacterIndex] = [
                            ...symbolCharacter,
                          ];
                          newRightHalfSymbolCharacters[symbolCharacterIndex][
                            moduleCharacterIndex
                          ] = !moduleCharacter;
                          setRightHalfSymbolCharacters(
                            newRightHalfSymbolCharacters,
                          );
                        }}
                      />
                    ),
                  )}
                </svg>
                <div className={styles.dataCharacterInfo}>
                  {rightHalfDigit !== null
                    ? `数字 ${rightHalfDigit}`
                    : "不正なキャラクタです。"}
                </div>
                <div className={styles.numberSetTypeInfo}>ナンバーセットC</div>
              </div>
            );
          },
        )}
      </div>
      <div className={styles.linearBarcode}>
        {linearBarcodeEAN13 !== null
          ? linearBarcodeEAN13.render()
          : "不正なパターンです。"}
      </div>
    </Playground>
  );
}
