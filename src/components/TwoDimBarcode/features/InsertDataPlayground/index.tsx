import TwoDimBarcode from "../../TwoDimBarcode";
import Playground from "@site/src/components/Playground";

export default function InsertDataPlayground() {
  return (
    <Playground title="データを入力">
      <p>データを入力していこう</p>
      <TwoDimBarcode />
    </Playground>
  );
}
