import TwoDimBarcode from "../../TwoDimBarcode";
import Playground from "@site/src/components/Playground";

export default function MaskPlayground() {
  return (
    <Playground title="マスク">
      <p>マスクをかけよう</p>
      <TwoDimBarcode />
    </Playground>
  );
}
