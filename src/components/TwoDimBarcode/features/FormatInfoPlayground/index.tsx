import { useEffect, useState } from "react";
import TwoDimBarcode from "../../TwoDimBarcode";
import Playground from "@site/src/components/Playground";
import createNewCells from "../../utils/createNewCells";
import { insertFormatInfo } from "../../utils/strTo2dBarcode";

export default function FormatInfoPlayground() {
  const [cells, setCells] = useState<boolean[][]>(createNewCells());

  useEffect(() => {
    // docusaurus の SSR への対応
    const cellsValue = localStorage.getItem("2dBarCodeCells");
    if (cellsValue) {
      setCells(JSON.parse(cellsValue));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("2dBarCodeCells", JSON.stringify(cells));
  }, [cells]);

  return (
    <Playground title="形式情報">
      <p>形式情報を入力しよう</p>
      <button
        onClick={() => {
          setCells(insertFormatInfo(cells));
        }}
      >
        形式情報を入力
      </button>
      <TwoDimBarcode cells={cells} setCells={setCells} />
    </Playground>
  );
}
