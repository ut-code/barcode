import { useEffect, useState } from "react";
import TwoDimBarcode from "../../TwoDimBarcode";
import Playground from "@site/src/components/Playground";
import createNewCells from "../../utils/createNewCells";
import { mask } from "../../utils/strTo2dBarcode";

export default function MaskPlayground() {
  const [cells, setCells] = useState<boolean[][]>(createNewCells());
  const [orderArrayForData, setOrderArrayForData] = useState<number[][]>([]);

  useEffect(() => {
    // docusaurus の SSR への対応
    const cellsValue = localStorage.getItem("2dBarCodeCells");
    if (cellsValue) {
      setCells(JSON.parse(cellsValue));
    }
    const orderArrayForDataValue = localStorage.getItem(
      "2dBarCodeOrderArrayForData",
    );
    if (orderArrayForDataValue) {
      setOrderArrayForData(JSON.parse(orderArrayForDataValue));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("2dBarCodeCells", JSON.stringify(cells));
  }, [cells]);

  return (
    <Playground title="マスク">
      <p>マスクをかけよう</p>
      <button
        onClick={() => {
          setCells(mask(cells, orderArrayForData));
        }}
      >
        マスクをかける
      </button>
      <TwoDimBarcode cells={cells} setCells={setCells} />
    </Playground>
  );
}
