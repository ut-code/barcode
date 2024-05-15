import TwoDimBarcode from "../../TwoDimBarcode";
import Playground from "@site/src/components/Playground";

export default function FormatInfoPlayground() {
  return (
    <Playground title="形式情報">
      <p>形式情報を入力しよう</p>
      <TwoDimBarcode />
    </Playground>
  );
}
