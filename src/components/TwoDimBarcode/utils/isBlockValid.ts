function upwardCellIndexes(initialNumber: number): number[] {
  return [
    initialNumber,
    initialNumber - 1,
    initialNumber - 21,
    initialNumber - 22,
    initialNumber - 42,
    initialNumber - 43,
    initialNumber - 63,
    initialNumber - 64,
  ];
}

function downwardCellIndexes(initialNumber: number): number[] {
  return [
    initialNumber,
    initialNumber - 1,
    initialNumber + 21,
    initialNumber + 20,
    initialNumber + 42,
    initialNumber + 41,
    initialNumber + 63,
    initialNumber + 62,
  ];
}

const blockIndexMapping = [
  upwardCellIndexes(21 * 20 + 20),
  upwardCellIndexes(21 * 20 + 20 - 21 * 4),
  upwardCellIndexes(21 * 20 + 20 - 21 * 8),
  downwardCellIndexes(21 * 9 + 18),
  downwardCellIndexes(21 * 9 + 18 + 21 * 4),
  downwardCellIndexes(21 * 9 + 18 + 21 * 8),
  upwardCellIndexes(21 * 20 + 16),
  upwardCellIndexes(21 * 20 + 16 - 21 * 4),
  upwardCellIndexes(21 * 20 + 16 - 21 * 8),
  downwardCellIndexes(21 * 9 + 14),
  downwardCellIndexes(21 * 9 + 14 + 21 * 4),
  downwardCellIndexes(21 * 9 + 14 + 21 * 8),
  upwardCellIndexes(21 * 20 + 12),
  upwardCellIndexes(21 * 20 + 12 - 21 * 4),
  upwardCellIndexes(21 * 20 + 12 - 21 * 8),
  [
    21 * 8 + 12,
    21 * 8 + 11,
    21 * 7 + 12,
    21 * 7 + 11,
    21 * 5 + 12,
    21 * 5 + 11,
    21 * 4 + 12,
    21 * 4 + 11,
  ],
  upwardCellIndexes(21 * 3 + 12),
  downwardCellIndexes(10),
  [
    21 * 4 + 10,
    21 * 4 + 9,
    21 * 5 + 10,
    21 * 5 + 9,
    21 * 7 + 10,
    21 * 7 + 9,
    21 * 8 + 10,
    21 * 8 + 9,
  ],
  downwardCellIndexes(21 * 9 + 10),
  downwardCellIndexes(21 * 9 + 10 + 21 * 4),
  downwardCellIndexes(21 * 9 + 10 + 21 * 8),
  upwardCellIndexes(21 * 12 + 8),
  downwardCellIndexes(21 * 9 + 5),
  upwardCellIndexes(21 * 12 + 3),
  downwardCellIndexes(21 * 9 + 1),
];

export function isBlockValid(blocks: string[], cells: boolean[][]): boolean[] {
  return blocks.map((block, blockIndex) => {
    const cellsIndex = blockIndexMapping[blockIndex];
    return block.split("").every((codeValue, bitIndex) => {
      const cellValue = cells.flat()[cellsIndex[bitIndex]] ? "1" : "0";
      return cellValue === codeValue;
    });
  });
}
