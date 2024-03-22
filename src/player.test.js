const Player = require("./player");
const Board = require("./board");
const Ships = require("./ships");

// beforeEach()

describe("Player Class allows Player 1 (human) to place an attack on the opposing board", () => {
  const carrier = new Ships(5, 0, false, "Crr");
  const player2Board = new Board(carrier);
  player2Board.placeShip(carrier, 0, 0, "horizontal");
  Stephen.playerAttack(0, 0);
  expect(player2Board.board).toEqual([
    ["Hit", "Crr", "Crr", "Crr", "Crr", 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  ]);
});
