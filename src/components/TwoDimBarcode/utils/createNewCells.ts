/**
 *
 * @returns 21x21 のセルを false で初期化した配列
 */
export default function createNewCells(): boolean[][] {
  return new Array(21).fill(false).map(() => new Array(21).fill(false));
}
