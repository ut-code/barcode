export const width = 37.29;
export const height = 22.86;
export const minElementWidth = 0.33;
// TODO: fix the following value
export const centerBarHeight = 24;
// TODO: fix the following value
export const guardBarHeight = 25;

export const characterPatternMap = {
  leftOddParity: [
    {
      character: 0,
      patter: [3, 2, 1, 1],
    },
    {
      character: 1,
      patter: [2, 2, 2, 1],
    },
    {
      character: 2,
      patter: [2, 1, 2, 2],
    },
    {
      character: 3,
      patter: [1, 4, 1, 1],
    },
    {
      character: 4,
      patter: [1, 1, 3, 2],
    },
    {
      character: 5,
      patter: [1, 2, 3, 1],
    },
    {
      character: 6,
      patter: [1, 1, 1, 4],
    },
    {
      character: 7,
      patter: [1, 3, 1, 2],
    },
    {
      character: 8,
      patter: [1, 2, 1, 3],
    },
    {
      character: 9,
      patter: [3, 1, 1, 2],
    },
  ],
  leftEvenParity: [
    {
      character: 0,
      patter: [1, 1, 2, 3],
    },
    {
      character: 1,
      patter: [1, 2, 2, 2],
    },
    {
      character: 2,
      patter: [2, 2, 1, 2],
    },
    {
      character: 3,
      patter: [1, 1, 4, 1],
    },
    {
      character: 4,
      patter: [2, 3, 1, 1],
    },
    {
      character: 5,
      patter: [1, 3, 2, 1],
    },
    {
      character: 6,
      patter: [4, 1, 1, 1],
    },
    {
      character: 7,
      patter: [2, 1, 3, 1],
    },
    {
      character: 8,
      patter: [3, 1, 2, 1],
    },
    {
      character: 9,
      patter: [2, 1, 1, 3],
    },
  ],
  rightEvenParity: [
    {
      character: 0,
      patter: [3, 2, 1, 1],
    },
    {
      character: 1,
      patter: [2, 2, 2, 1],
    },
    {
      character: 2,
      patter: [2, 1, 2, 2],
    },
    {
      character: 3,
      patter: [1, 4, 1, 1],
    },
    {
      character: 4,
      patter: [1, 1, 3, 2],
    },
    {
      character: 5,
      patter: [1, 2, 3, 1],
    },
    {
      character: 6,
      patter: [1, 1, 1, 4],
    },
    {
      character: 7,
      patter: [1, 3, 1, 2],
    },
    {
      character: 8,
      patter: [1, 2, 1, 3],
    },
    {
      character: 9,
      patter: [3, 1, 1, 2],
    },
  ],
};

export const characterOddEvenPatternMap = [
  {
    character: 0,
    pattern: ["odd", "odd", "odd", "odd", "odd", "odd"],
  },
  {
    character: 1,
    pattern: ["odd", "odd", "even", "odd", "even", "even"],
  },
  {
    character: 2,
    pattern: ["odd", "odd", "even", "even", "odd", "even"],
  },
  {
    character: 3,
    pattern: ["odd", "odd", "even", "even", "even", "odd"],
  },
  {
    character: 4,
    pattern: ["odd", "even", "odd", "odd", "even", "even"],
  },
  {
    character: 5,
    pattern: ["odd", "even", "even", "odd", "odd", "even"],
  },
  {
    character: 6,
    pattern: ["odd", "even", "even", "even", "odd", "odd"],
  },
  {
    character: 7,
    pattern: ["odd", "even", "odd", "even", "odd", "even"],
  },
  {
    character: 8,
    pattern: ["odd", "even", "odd", "even", "even", "odd"],
  },
  {
    character: 9,
    pattern: ["odd", "even", "even", "odd", "even", "odd"],
  },
];
