import TwoDimBarcode from "../..";
import { insertFunctionalPattern } from "../../utils/strTo2dBarcode";
import Playground from "@site/src/components/Playground";
import createNewCells from "../../utils/createNewCells";
import { useEffect, useState } from "react";

export default function FunctionalPatternPlayground() {
  const [cells, setCells] = useState<boolean[][]>(createNewCells());

  useEffect(() => {
    // docusaurus の SSR への対応
    const value = localStorage.getItem("2dBarCodeCells");
    if (value) {
      setCells(JSON.parse(value));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("2dBarCodeCells", JSON.stringify(cells));
  }, [cells]);

  return (
    <Playground title="機能パターン">
      <p>機能パターンを入れてみよう</p>
      <button
        onClick={() => {
          setCells(insertFunctionalPattern(createNewCells()));
        }}
      >
        機能パターンを挿入
      </button>
      <TwoDimBarcode cells={cells} setCells={setCells} />
    </Playground>
  );
}
