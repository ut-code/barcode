import { useState } from "react";
import { calculateLeadingDigit } from "../LinearBarcodeEAN13/calculateDigits";
import Playground from "../../Playground";
import styles from "./index.module.css";

function createLeadingDigit(numberSetTypes: ("A" | "B")[]): number | null {
  try {
    return calculateLeadingDigit(numberSetTypes);
  } catch {
    return null;
  }
}

export default function CalculateLeadingDigitPlayground(): JSX.Element {
  const [numberSetTypes, setNumberSetTypes] = useState<("A" | "B")[]>([
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
  ]);
  const leadingDigit = createLeadingDigit(numberSetTypes);

  return (
    <Playground title="Leading Digit">
      <svg viewBox="0 0 60 10" className={styles.numberSetTypesContainer}>
        {numberSetTypes.map((numberSetType, index) => (
          <text
            key={index}
            x={index * 10}
            y="10"
            fontSize="10"
            onClick={() => {
              const newModuleCharacters: ("A" | "B")[] = [...numberSetTypes];
              newModuleCharacters[index] = numberSetType === "A" ? "B" : "A";
              setNumberSetTypes(newModuleCharacters);
            }}
          >
            {numberSetType}
          </text>
        ))}
      </svg>
      <div>
        {leadingDigit !== null
          ? `leading digitは${leadingDigit}です。`
          : "不正なセット列です。"}
      </div>
    </Playground>
  );
}
