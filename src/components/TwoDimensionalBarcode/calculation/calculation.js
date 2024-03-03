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

// 8bit の数字が16個
const data = [
  32, 125, 174, 205, 49, 93, 77, 57, 103, 252, 208, 206, 0, 236, 17, 236,
];

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
console.log(result.toString(2));
