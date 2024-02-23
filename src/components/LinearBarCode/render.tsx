import type { BarcodeSymbol } from "./types";

export default function render(
  imageWidth: number,
  imageHeight: number,
  barcodeWidth: number,
  barcodeHeight: number,
  minElementWidth: number,
  guardBarHeight: number,
  centerBarHeight: number,
  barcodeSymbol: BarcodeSymbol,
): JSX.Element {
  const quietZoneWidth =
    (barcodeWidth - minElementWidth * (3 + 7 * 6 + 5 + 7 * 6 + 3)) / 2;
  // TODO: fix the following value
  const containerHeight = guardBarHeight;

  let offsetX = quietZoneWidth;

  const leftGuardBarImage = (
    <>
      <rect
        x={offsetX}
        y="0"
        width={minElementWidth}
        height={guardBarHeight}
        fill="black"
      />
      <rect
        x={offsetX + minElementWidth * 2}
        y="0"
        width={minElementWidth}
        height={guardBarHeight}
        fill="black"
      />
    </>
  );

  offsetX += minElementWidth * 3;

  const leftBarcodeSymbolImage = barcodeSymbol
    .slice(0, 6)
    .map((barcodeCharacter) => {
      const barcodeCharacterImage = barcodeCharacter.map(
        (barcodeElement, index) => {
          const rect = (
            <rect
              key={index}
              x={offsetX}
              y="0"
              width={minElementWidth * barcodeElement}
              height={barcodeHeight}
              fill={index % 2 === 0 ? "white" : "black"}
            />
          );
          offsetX += minElementWidth * barcodeElement;
          return rect;
        },
      );
      return barcodeCharacterImage;
    });

  const ceterBarImage = (
    <>
      <rect
        x={offsetX + minElementWidth}
        y="0"
        width={minElementWidth}
        height={centerBarHeight}
        fill="black"
      />
      <rect
        x={offsetX + minElementWidth * 3}
        y="0"
        width={minElementWidth}
        height={centerBarHeight}
        fill="black"
      />
    </>
  );

  offsetX += minElementWidth * 5;

  const rightBarcodeSymbolImage = barcodeSymbol
    .slice(6, 12)
    .map((barcodeCharacter) => {
      const barcodeCharacterImage = barcodeCharacter.map(
        (barcodeElement, index) => {
          const rect = (
            <rect
              key={index}
              x={offsetX}
              y="0"
              width={minElementWidth * barcodeElement}
              height={barcodeHeight}
              fill={index % 2 === 0 ? "black" : "white"}
            />
          );
          offsetX += minElementWidth * barcodeElement;
          return rect;
        },
      );
      return barcodeCharacterImage;
    });

  const rightGuardBarImage = (
    <>
      <rect
        x={offsetX}
        y="0"
        width={minElementWidth}
        height={guardBarHeight}
        fill="black"
      />
      <rect
        x={offsetX + minElementWidth * 2}
        y="0"
        width={minElementWidth}
        height={guardBarHeight}
        fill="black"
      />
    </>
  );

  return (
    <svg
      width={imageWidth}
      height={imageHeight}
      viewBox={`0 0 ${barcodeWidth} ${containerHeight}`}
    >
      <rect
        x="0"
        y="0"
        width={barcodeWidth}
        height={containerHeight}
        fill="white"
      />
      {leftGuardBarImage}
      {leftBarcodeSymbolImage}
      {ceterBarImage}
      {rightBarcodeSymbolImage}
      {rightGuardBarImage}
    </svg>
  );
}
