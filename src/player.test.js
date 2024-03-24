const Player = require("./player");
const Board = require("./board");
const Ships = require("./ships");

test("Player Class allows Player 1 (human) to place an attack on the opposing board with hardcoded values", () => {
  const testPlayer = new Player();
  testPlayer.computerBoard.placeShip(
    testPlayer.computerBoard.carrier,
    0,
    0,
    "horizontal"
  );

  testPlayer.computerBoard.receiveAttack(0, 0);
  expect(testPlayer.computerBoard.board).toEqual([
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
