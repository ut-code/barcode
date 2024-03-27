export default function makeOrderArrayForData() {
  const orderArrayForData = new Array(26 * 8).fill(Array(2).fill(0));
  let index = 0;
  for (let i = 20; i > 8; --i) {
    orderArrayForData[index] = [i, 20];
    ++index;
    orderArrayForData[index] = [i, 19];
    ++index;
  }
  for (let i = 9; i <= 20; ++i) {
    orderArrayForData[index] = [i, 18];
    ++index;
    orderArrayForData[index] = [i, 17];
    ++index;
  }
  for (let i = 20; i > 8; --i) {
    orderArrayForData[index] = [i, 16];
    ++index;
    orderArrayForData[index] = [i, 15];
    ++index;
  }
  for (let i = 9; i <= 20; ++i) {
    orderArrayForData[index] = [i, 14];
    ++index;
    orderArrayForData[index] = [i, 13];
    ++index;
  }

  for (let i = 20; i > 6; --i) {
    orderArrayForData[index] = [i, 12];
    ++index;
    orderArrayForData[index] = [i, 11];
    ++index;
  }
  for (let i = 5; i >= 0; --i) {
    orderArrayForData[index] = [i, 12];
    ++index;
    orderArrayForData[index] = [i, 11];
    ++index;
  }
  for (let i = 0; i <= 5; ++i) {
    orderArrayForData[index] = [i, 10];
    ++index;
    orderArrayForData[index] = [i, 9];
    ++index;
  }
  for (let i = 7; i <= 20; ++i) {
    orderArrayForData[index] = [i, 10];
    ++index;
    orderArrayForData[index] = [i, 9];
    ++index;
  }

  for (let i = 12; i > 8; --i) {
    orderArrayForData[index] = [i, 8];
    ++index;
    orderArrayForData[index] = [i, 7];
    ++index;
  }
  for (let i = 9; i <= 12; ++i) {
    orderArrayForData[index] = [i, 5];
    ++index;
    orderArrayForData[index] = [i, 4];
    ++index;
  }
  for (let i = 12; i > 8; --i) {
    orderArrayForData[index] = [i, 3];
    ++index;
    orderArrayForData[index] = [i, 2];
    ++index;
  }
  for (let i = 9; i <= 12; ++i) {
    orderArrayForData[index] = [i, 1];
    ++index;
    orderArrayForData[index] = [i, 0];
    ++index;
  }
  return orderArrayForData;
}
