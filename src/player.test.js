const Player = require("./player");
const Board = require("./board");
const Ships = require("./ships");

const testPlayer = new Player();
testPlayer.computerBoard.placeShip(testPlayer.computerBoard.carrier, 0, 0, "horizontal");
testPlayer.myBoard.placeShip(testPlayer.myBoard.carrier, 0, 0, "horizontal");

test("Player Class allows Player 1 (human) to place an attack on the opposing board with hardcoded values", () => {
  testPlayer.computerBoard.receiveAttack(0, 0);
  expect(testPlayer.computerBoard.board[0][0]).toEqual("Hit");
});

test("player1 now has it's own method, myAttack(), with which to attack the opposing computer class", () => {
  testPlayer.myAttack(0, 1);
  expect(testPlayer.computerBoard.board[0][1]).toEqual("Hit" || "Miss");
});

test("the computer board will randomly place the five ships on the board before the start of each game", () => {
  const testPlayer2 = new Player();
  const flattenedBoard = testPlayer2.computerBoard.board.flat();
  const stringsToCheck = ["Crr", "Bat", "Cru", "Sub", "Des"];
  const areAllStringsPresent = stringsToCheck.every((str) => flattenedBoard.includes(str));
  expect(areAllStringsPresent).toEqual(true);
});
