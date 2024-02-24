import { Fragment } from "react";
import calculateDigits from "./calculateDigits";
import {
  barcodeHeight,
  centreGuardBarPattern,
  digitsBarsSpace,
  digitsFontFamily,
  guardBarHeight,
  leftQuietZoneWidth,
  normalGuardBarPattern,
  symbolHeight,
  symbolLength,
  xDimension,
} from "./constants";
import { LinearBarcodeData } from "./types";

/**
 * Renders the linear barcode
 * @param linearBarcodeData - The linear barcode data
 * @param style - The style
 * @param options - The options
 * @returns The SVG image
 */
export default function render(
  linearBarcodeData: LinearBarcodeData,
  style?: React.CSSProperties,
  options?: { showDigits?: boolean },
): JSX.Element {
  /**
   * The offset Y of the digit
   *
   * @remarks
   * The actual offset Y is symbolHeight + xDimension * digitsBarsSpace.
   */
  const digitOffsetY = symbolHeight + xDimension * digitsBarsSpace * 9;
  /**
   * The font size of the digit
   *
   * @remarks
   * This value is not specified in the specification.
   */
  const digitFontSize = 3.5;

  const leadingDigitImage = (
    <text
      x="0"
      y={digitOffsetY}
      fontSize={digitFontSize}
      fontFamily={digitsFontFamily}
    >
      {calculateDigits(linearBarcodeData)[0]}
    </text>
  );

  const leftGuardBarImage = normalGuardBarPattern.map(
    (moduleCharacter, index) => {
      return (
        <rect
          key={index}
          x={xDimension * leftQuietZoneWidth + xDimension * index}
          y="0"
          width={xDimension}
          height={guardBarHeight}
          fill={moduleCharacter ? "black" : "white"}
        />
      );
    },
  );

  const leftHalfSymbolCharactersImage =
    linearBarcodeData.leftHalfSymbolCharacters.map(
      (symbolCharacter, symbolCharacterIndex) => {
        const symbolCharacterImage = symbolCharacter.map(
          (moduleCharacter, moduleCharacterIndex) => {
            return (
              <rect
                key={moduleCharacterIndex}
                x={
                  xDimension * leftQuietZoneWidth +
                  xDimension *
                    (3 + 7 * symbolCharacterIndex + moduleCharacterIndex)
                }
                y="0"
                width={xDimension}
                height={symbolHeight}
                fill={moduleCharacter ? "black" : "white"}
              />
            );
          },
        );
        return (
          <Fragment key={symbolCharacterIndex}>
            {symbolCharacterImage}
            {(options?.showDigits ?? true) && (
              <text
                x={
                  xDimension * leftQuietZoneWidth +
                  xDimension * (3 + 7 * symbolCharacterIndex)
                }
                y={digitOffsetY}
                fontSize={digitFontSize}
                fontFamily={digitsFontFamily}
              >
                {calculateDigits(linearBarcodeData)[symbolCharacterIndex + 1]}
              </text>
            )}
          </Fragment>
        );
      },
    );

  const centreGuardBarImage = centreGuardBarPattern.map(
    (moduleCharacter, index) => {
      return (
        <rect
          key={index}
          x={xDimension * leftQuietZoneWidth + xDimension * (3 + 7 * 6 + index)}
          y="0"
          width={xDimension}
          height={guardBarHeight}
          fill={moduleCharacter ? "black" : "white"}
        />
      );
    },
  );

  const rightHalfSymbolCharactersImage =
    linearBarcodeData.rightHalfSymbolCharacters.map(
      (symbolCharacter, symbolCharacterIndex) => {
        const symbolCharacterImage = symbolCharacter.map(
          (moduleCharacter, moduleCharacterIndex) => {
            return (
              <rect
                key={moduleCharacterIndex}
                x={
                  xDimension * leftQuietZoneWidth +
                  xDimension *
                    (3 +
                      7 * 6 +
                      5 +
                      7 * symbolCharacterIndex +
                      moduleCharacterIndex)
                }
                y="0"
                width={xDimension}
                height={symbolHeight}
                fill={moduleCharacter ? "black" : "white"}
              />
            );
          },
        );
        return (
          <Fragment key={symbolCharacterIndex}>
            {symbolCharacterImage}
            {(options?.showDigits ?? true) && (
              <text
                x={
                  xDimension * leftQuietZoneWidth +
                  xDimension * (3 + 7 * 6 + 5 + 7 * symbolCharacterIndex)
                }
                y={digitOffsetY}
                fontSize={digitFontSize}
                fontFamily={digitsFontFamily}
              >
                {calculateDigits(linearBarcodeData)[symbolCharacterIndex + 7]}
              </text>
            )}
          </Fragment>
        );
      },
    );

  const rightGuardBarImage = normalGuardBarPattern.map(
    (moduleCharacter, index) => {
      return (
        <rect
          key={index}
          x={
            xDimension * leftQuietZoneWidth +
            xDimension * (3 + 7 * 6 + 5 + 7 * 6 + index)
          }
          y="0"
          width={xDimension}
          height={guardBarHeight}
          fill={moduleCharacter ? "black" : "white"}
        />
      );
    },
  );

  return (
    <svg
      viewBox={`0 0 ${xDimension * symbolLength} ${barcodeHeight}`}
      style={style}
    >
      <rect
        x="0"
        y="0"
        width={xDimension * symbolLength}
        height={barcodeHeight}
        fill="white"
      />
      {(options?.showDigits ?? true) && leadingDigitImage}
      {leftGuardBarImage}
      {leftHalfSymbolCharactersImage}
      {centreGuardBarImage}
      {rightHalfSymbolCharactersImage}
      {rightGuardBarImage}
    </svg>
  );
}
