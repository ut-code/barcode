import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import LinearBarcodeEAN13 from "../components/LinearBarcode/LinearBarcodeEAN13";

export default function LinearBarcodePage(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="このサイトでは、二次元コードを体験することができます。"
    >
      {new LinearBarcodeEAN13(
        LinearBarcodeEAN13.getDefaultLinearBarcodeData(),
      ).render({ width: "400px" })}
    </Layout>
  );
}
