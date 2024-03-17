const Board = require("./board");
const Ships = require("./ships");

test("ship class will generate a new board calling the generateBoard function", () => {
  const testBoard = new Board();
  expect(testBoard).toEqual({
    board: [
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
    ],
  });
});

test("the game board can be amended using row and column coordinates", () => {
  const testBoard = new Board();
  testBoard.board[3][4] = "ship";
  expect(testBoard).toEqual({
    board: [
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
    ],
  });
});

test("the game board can call the ship class and place a ship horizontally on a row on the board, using the ships length to place hardcoded replacement strings", () => {
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
  expect(testBoard).toEqual({
    board: [
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
    ],
  });
});

test("places a ship horizonatally on a game board with placeBoard() method and replacement strings are produced dynamically in accordance with ship length", () => {
  const carrier = new Ships(5, 0, false, "ship");
  const testBoard = new Board();
  expect(testBoard.placeShip(carrier, 0, 0, "horizontal")).toEqual({
    board: [
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
    ],
  });
});

test("the 'direction' argument applied to placeShip method to allow ship to be placed horizontally as well as vertically", () => {
  const carrier = new Ships(5, 0, false, "ship");
  const testBoard = new Board();
  expect(testBoard.placeShip(carrier, 0, 0, "vertical")).toEqual({
    board: [
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
    ],
  });
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
  expect(testBoard).toEqual({
    board: [
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
    ],
  });
});

test("ships cannot overlap each other when being placed on the board", () => {
  const carrier = new Ships(5, 0, false, "Crr");
  const battleship = new Ships(4, 0, false, "Bat");
  const testBoard = new Board();
  testBoard.placeShip(carrier, 0, 0, "horizontal");
  testBoard.placeShip(battleship, 0, 0, "vertical");
  expect(testBoard).toEqual({
    board: [
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
    ],
  });
});
