import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import LinearBarcode from "../components/LinearBarCode";
import { useState } from "react";
import { BarcodeSymbol } from "../components/LinearBarCode/types";

export default function LinearBarcodePage(): JSX.Element {
  const [barcodeSymbol, setBarcodeSymbol] = useState<BarcodeSymbol>([
    [3, 2, 1, 1],
    [3, 2, 1, 1],
    [3, 2, 1, 1],
    [3, 2, 1, 1],
    [3, 2, 1, 1],
    [3, 2, 1, 1],
    [3, 2, 1, 1],
    [3, 2, 1, 1],
    [3, 2, 1, 1],
    [3, 2, 1, 1],
    [3, 2, 1, 1],
    [3, 2, 1, 1],
  ]);
  const { siteConfig } = useDocusaurusContext();
  const barcode = new LinearBarcode(barcodeSymbol);

  return (
    <Layout
      title={siteConfig.title}
      description="このサイトでは、二次元コードを体験することができます。"
    >
      <table>
        <thead>
          <tr>
            <th></th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(12)].map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex}番目</td>
              {[...Array(4)].map((column, columnIndex) => (
                <td key={columnIndex}>
                  <input
                    type="number"
                    value={barcodeSymbol[rowIndex][columnIndex]}
                    onChange={(event) => {
                      const newBarcodeSymbol: BarcodeSymbol = [
                        ...barcodeSymbol,
                      ];
                      newBarcodeSymbol[rowIndex][columnIndex] = Number(
                        event.target.value,
                      ) as 1 | 2 | 3 | 4;
                      setBarcodeSymbol(newBarcodeSymbol);
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {barcode.render(372.9, 228.6)}
      {LinearBarcode.validate(barcodeSymbol) ? (
        <>コードは、{barcode.getCodes()}です。</>
      ) : (
        <>不正な値です。</>
      )}
    </Layout>
  );
}
