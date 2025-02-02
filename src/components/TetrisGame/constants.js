export const TETROMINO_SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [[2, 2], [2, 2]],
  T: [[3, 3, 3], [0, 3, 0]],
  L: [[4, 4, 4], [4, 0, 0]],
  J: [[5, 5, 5], [0, 0, 5]],
  S: [[6, 6, 0], [0, 6, 6]],
  Z: [[0, 7, 7], [7, 7, 0]]
};

export const COLORS = [
  '#000000', // empty
  '#FF0D72', // I
  '#0DC2FF', // O
  '#0DFF72', // T
  '#F538FF', // L
  '#FF8E0D', // J
  '#FFE138', // S
  '#3877FF'  // Z
];

export const GAME_CONSTANTS = {
  WIDTH: 10,
  HEIGHT: 20,
  BLOCK_SIZE: 30,
};