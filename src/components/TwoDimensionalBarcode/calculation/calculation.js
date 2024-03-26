// console.log(stringToData("WE LOVE KIMWIPE"));

// 共に、はじめの0は省略される。例：00110 → 110
function stringToData(string) {
  const bitData = stringToBitData(string);
  const dataArray = bitDataToDataArray(bitData);
  const errorCorrectionCode = bitDataToErrorCorrectionCode(dataArray);
  return [bitData, errorCorrectionCode];
}

function answerOfNumberToAlfa(alfa) {
  const f = BigInt(0b100011101);
  let x = BigInt(1);
  for (let i = 0; i < 256; i++) {
    while (x >= BigInt(256)) {
      x = (x ^ f) - BigInt(256);
    }
    if (x < BigInt(0)) {
      x += BigInt(256);
    }
    alfa[i] = x;
    x = x << BigInt(1);
  }
}

function stringToNumber(letter) {
  const stringToNumberTable = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    " ",
    "$",
    "%",
    "*",
    "+",
    "-",
    ".",
    "/",
    ":",
  ];
  for (let i = 0; i < stringToNumberTable.length; ++i) {
    if (letter === stringToNumberTable[i]) {
      return i;
    }
  }
  // こっちの処理はできていない
  return -1;
}

//  string例
// const string = "UT.CODE"
function stringToBitData(string) {
  let bitLength = 0;

  let dataBit = BigInt(0);

  // 英数字モード
  dataBit += BigInt(2);
  bitLength += 4;

  // 文字数
  dataBit = dataBit << BigInt(9);
  dataBit += BigInt(string.length);
  bitLength += 9;

  for (let i = 0; i < Math.floor(string.length / 2); ++i) {
    dataBit = dataBit << BigInt(11);
    bitLength += 11;
    dataBit += BigInt(
      stringToNumber(string.charAt(2 * i)) * 45 +
        stringToNumber(string.charAt(2 * i + 1)),
    );
  }
  if (string.length % 2 !== 0) {
    dataBit = dataBit << BigInt(6);
    bitLength += 6;
    dataBit += BigInt(stringToNumber(string.charAt(string.length - 1)));
  }
  // 終端パターン
  dataBit = dataBit << BigInt(4);
  bitLength += 4;

  if (bitLength % 8 !== 0) {
    dataBit = dataBit << BigInt(8 - (bitLength % 8));
    bitLength += 8 - (bitLength % 8);
  }

  // 埋め草コード語
  let i = 0;
  const restOfBit = 128 - bitLength;
  for (; i < Math.floor(restOfBit / 8); ++i) {
    if (i % 2 === 0) {
      dataBit = dataBit << BigInt(8);
      bitLength += 8;
      dataBit += BigInt(236);
    } else {
      dataBit = dataBit << BigInt(8);
      bitLength += 8;
      dataBit += BigInt(17);
    }
  }
  // console.log(dataBit.toString(2));
  return dataBit;
}

function bitDataToDataArray(dataBit) {
  // databitをdataの配列に直す
  const dataArray = new Array(16).fill(BigInt(0));
  for (let j = 0; j < 16; ++j) {
    dataArray[j] = Number((dataBit >> BigInt(8 * (15 - j))) % BigInt(256));
  }
  return dataArray;
}

// console.log(stringToBitData("WE LOVE KIMWIPE"));

// データを用いて、誤り訂正符号の作成までを行う。
// data例
// const data = [
//   32, 125, 174, 205, 49, 93, 77, 57, 103, 252, 208, 206, 0, 236, 17, 236,
// ];
function bitDataToErrorCorrectionCode(data) {
  // alfaの対応表作成
  const alfa = new Array(256).fill(BigInt(0));
  answerOfNumberToAlfa(alfa);

  // 生成多項式作成
  const coefficientForG = [0, 251, 67, 46, 61, 118, 70, 64, 94, 32, 45];
  let g = BigInt(0);
  for (let i = 0; i < coefficientForG.length; i++) {
    g = g << BigInt(8);
    g += alfa[coefficientForG[i]];
  }

  // データ多項式生成
  let r = BigInt(0);
  for (let i = 0; i < data.length; i++) {
    r = r << BigInt(8);
    if (data[i] !== 0) {
      r += BigInt(data[i]);
    }
  }

  // 誤り訂正の多項式を求めるために桁上げ
  r = r << BigInt(8 * coefficientForG.length);

  // 割り算をして、誤り訂正の多項式を求める
  for (let i = data.length; i > 0; i--) {
    let flag = BigInt(0);
    const head = r >> BigInt(8 * (10 + i));
    for (let j = 0; j < 256; j++) {
      if (head === alfa[j]) {
        flag = BigInt(j);
        break;
      }
    }
    let tmpG = BigInt(0);
    for (let j = 0; j < coefficientForG.length; j++) {
      tmpG = tmpG << BigInt(8);
      tmpG += alfa[(coefficientForG[j] + Number(flag)) % 255];
    }
    tmpG = tmpG << BigInt(8 * i);
    r = r ^ tmpG;
  }

  // 誤り訂正符号の多項式
  const result = r >> BigInt(8);
  // console.log(result.toString(2));
  return result;
}

export default stringToData;
