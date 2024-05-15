import TwoDimBarcode from "../../TwoDimBarcode";
import Playground from "@site/src/components/Playground";

export default function FunctionalPatternPlayground() {
  return (
    <Playground title="機能パターン">
      <p>機能パターンを入れてみよう</p>
      <TwoDimBarcode enabledButton={"insertFunctionalPattern"} />
    </Playground>
  );
}
