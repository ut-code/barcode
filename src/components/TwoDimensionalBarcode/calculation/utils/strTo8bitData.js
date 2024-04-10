// 共に、はじめの0は省略される。例：00110 → 110
function strTo8bitData(string) {
  const bitData = stringToBitDataForEightBitByte(string);
  const dataArray = bitDataToDataArray(bitData);
  const errorCorrectionCode = bitDataToErrorCorrectionCode(dataArray);
  return { bitData: bitData, errorCorrectionCode: errorCorrectionCode };
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

function stringToNumberForEightBitByte(letter) {
  const asciiArray = [];
  for (let i = 0; i < 128; i++) {
    asciiArray.push(String.fromCharCode(i));
  }

  // 配列の中身を表示
  // console.log(asciiArray);

  for (let i = 0; i < asciiArray.length; ++i) {
    if (letter === asciiArray[i]) {
      return i;
    }
  }
  // こっちの処理はできていない
  return -1;
}

function stringToBitDataForEightBitByte(string) {
  let bitLength = 0;

  let dataBit = BigInt(0);

  // 8bitバイト
  dataBit += BigInt(4);
  bitLength += 4;

  // 文字数
  dataBit = dataBit << BigInt(8);
  dataBit += BigInt(string.length);
  bitLength += 8;

  for (let i = 0; i < string.length; ++i) {
    if (bitLength > 116) {
      break;
    }
    dataBit = dataBit << BigInt(8);
    bitLength += 8;
    dataBit += BigInt(stringToNumberForEightBitByte(string.charAt(i)));
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
  // console.log(bitLength)
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

  return result;
}

export default strTo8bitData;
