import TwoDimBarcode from "../..";
import { insertFunctionalPattern } from "../../utils/strTo2dBarcode";
import Playground from "@site/src/components/Playground";
import createNewCells from "../../utils/createNewCells";

export default function FunctionalPatternPlayground() {
  return (
    <Playground title="機能パターン">
      <p>機能パターンを入れてみよう</p>
      <TwoDimBarcode
        buttonText="機能パターンを挿入"
        buttonOnClick={() => {
          return insertFunctionalPattern(createNewCells());
        }}
      />
    </Playground>
  );
}
