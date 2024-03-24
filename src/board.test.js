const Board = require("./board");
const Ships = require("./ships");

test("ship class will generate a new board by automatically calling the generateBoard() function", () => {
  const testBoard = new Board();
  expect(testBoard.board).toEqual([
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

test("the game board number values can be replaced with strings using row and column coordinates", () => {
  const testBoard = new Board();
  testBoard.board[3][4] = "ship";
  expect(testBoard.board).toEqual([
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, "ship", 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  ]);
});

test("the game board can call the ship class and place a ship horizontally on the board, using the ships length to place hardcoded replacement strings", () => {
  const carrier = new Ships(5, 0, false);
  const testBoard = new Board();
  testBoard.board[0].splice(
    0,
    carrier.length,
    "ship",
    "ship",
    "ship",
    "ship",
    "ship"
  );
  expect(testBoard.board).toEqual([
    ["ship", "ship", "ship", "ship", "ship", 5, 6, 7, 8, 9],
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

test("places a ship horizonatally on a game board with placeBoard() method and replacement strings are produced dynamically in accordance with ship length", () => {
  const carrier = new Ships(5, 0, false, "ship");
  const testBoard = new Board();
  testBoard.placeShip(carrier, 0, 0, "horizontal");
  expect(testBoard.board).toEqual([
    ["ship", "ship", "ship", "ship", "ship", 5, 6, 7, 8, 9],
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

test("the 'direction' argument now applied to placeShip method to allow ship to be placed horizontally as well as vertically", () => {
  const carrier = new Ships(5, 0, false, "ship");
  const testBoard = new Board();
  testBoard.placeShip(carrier, 0, 0, "vertical");
  expect(testBoard.board).toEqual([
    ["ship", 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ["ship", 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ["ship", 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ["ship", 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ["ship", 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  ]);
});

test("all five ships can be placed on the board, either vertically or horizontally, with a unique name for each ship", () => {
  const carrier = new Ships(5, 0, false, "Crr");
  const battleship = new Ships(4, 0, false, "Bat");
  const cruiser = new Ships(3, 0, false, "Cru");
  const submarine = new Ships(3, 0, false, "Sub");
  const destroyer = new Ships(2, 0, false, "Des");
  const testBoard = new Board();
  testBoard.placeShip(carrier, 0, 0, "horizontal");
  testBoard.placeShip(battleship, 1, 0, "vertical");
  testBoard.placeShip(cruiser, 4, 3, "horizontal");
  testBoard.placeShip(submarine, 5, 4, "vertical");
  testBoard.placeShip(destroyer, 8, 6, "vertical");
  expect(testBoard.board).toEqual([
    ["Crr", "Crr", "Crr", "Crr", "Crr", 5, 6, 7, 8, 9],
    ["Bat", 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ["Bat", 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ["Bat", 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ["Bat", 1, 2, "Cru", "Cru", "Cru", 6, 7, 8, 9],
    [0, 1, 2, 3, "Sub", 5, 6, 7, 8, 9],
    [0, 1, 2, 3, "Sub", 5, 6, 7, 8, 9],
    [0, 1, 2, 3, "Sub", 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, "Des", 7, 8, 9],
    [0, 1, 2, 3, 4, 5, "Des", 7, 8, 9],
  ]);
});

test("ships cannot overlap each other when being placed on the board", () => {
  const carrier = new Ships(5, 0, false, "Crr");
  const battleship = new Ships(4, 0, false, "Bat");
  const testBoard = new Board();
  testBoard.placeShip(carrier, 0, 0, "horizontal");
  testBoard.placeShip(battleship, 0, 0, "vertical");
  expect(testBoard.board).toEqual([
    ["Crr", "Crr", "Crr", "Crr", "Crr", 5, 6, 7, 8, 9],
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

// RECEIVE ATTACK

test("the receiveAttack() method will determine if the opposing player has hit a ship or missed", () => {
  const carrier = new Ships(5, 0, false, "Crr");
  const testBoard = new Board(carrier);
  testBoard.placeShip(carrier, 0, 0, "horizontal");

  testBoard.receiveAttack(0, 0);
  testBoard.receiveAttack(1, 0);

  expect(testBoard.board).toEqual([
    ["Hit", "Crr", "Crr", "Crr", "Crr", 5, 6, 7, 8, 9],
    ["Miss", 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  ]);
  expect(testBoard.carrier.timesHit).toEqual(1);
});

test("if a ship has received all 'hits' on the board, its sunk value will convert to true", () => {
  const testBoard = new Board();
  testBoard.placeShip(testBoard.carrier, 0, 0, "horizontal");
  testBoard.receiveAttack(0, 0);
  testBoard.receiveAttack(0, 1);
  testBoard.receiveAttack(0, 2);
  testBoard.receiveAttack(0, 3);
  testBoard.receiveAttack(0, 4);
  expect(testBoard.carrier.sunk).toEqual(true);
});

test("if all ship have been sunk, you will be informed of this in the console (no UI in place yet)", () => {
  const testBoard = new Board();
  testBoard.carrier.sunk = true;
  testBoard.battleship.sunk = true;
  testBoard.cruiser.sunk = true;
  testBoard.submarine.sunk = true;
  testBoard.destroyer.sunk = true;
  testBoard.placeShip(testBoard.carrier, 0, 0, "horizontal");
  testBoard.placeShip(testBoard.battleship, 1, 0, "vertical");
  testBoard.placeShip(testBoard.cruiser, 4, 3, "horizontal");
  testBoard.placeShip(testBoard.submarine, 5, 4, "vertical");
  testBoard.placeShip(testBoard.destroyer, 8, 6, "vertical");

  expect(testBoard.allShipsSunk()).toEqual(true);
});
