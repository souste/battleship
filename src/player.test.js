const Player = require("./player");
const Board = require("./board");
const Ships = require("./ships");

const testPlayer = new Player();
testPlayer.computerBoard.placeShip(testPlayer.computerBoard.carrier, 0, 0, "horizontal");
testPlayer.myBoard.placeShip(testPlayer.myBoard.carrier, 0, 0, "horizontal");

// test("Player Class allows Player 1 (human) to place an attack on the opposing board with hardcoded values", () => {
//   testPlayer.computerBoard.receiveAttack(0, 0);
//   expect(testPlayer.computerBoard.board).toEqual([
//     ["Hit", "Crr", "Crr", "Crr", "Crr", 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//   ]);
// });

// test("player1 now has it's own method, myAttack(), with which to attack the opposing computer class", () => {
//   testPlayer.myAttack(0, 1);
//   expect(testPlayer.computerBoard.board).toEqual([
//     ["Hit", "Hit", "Crr", "Crr", "Crr", 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//   ]);
// });

// test("the computer has its own method, compAttack(), which will attack the player1 board, manually for now", () => {
//   testPlayer.compAttack();
//   expect(testPlayer.myBoard.board).toEqual([
//     ["Hit", "Crr", "Crr", "Crr", "Crr", 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//   ]);
// });

test("the computer board will randomly place the five ships on the board before the start of each game", () => {
  const testPlayer2 = new Player();
  testPlayer2.compShipPlacement();
  expect(testPlayer2.computerBoard.board).not.toEqual([
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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
