const Ships = require("./ships");

class Board {
  constructor() {
    this.board = this.generateBoard();
  }

  generateBoard() {
    let board = [];
    for (let i = 0; i < 10; i++) {
      let boardRow = [];
      for (let j = 0; j < 10; j++) {
        boardRow.push(j);
      }
      board.push(boardRow);
    }
    return board;
  }

  placeShip(ship, cord1, cord2) {
    let arr = [];
    for (let i = 0; i < ship.length; i++) {
      arr.push("ship");
    }

    this.board[cord1].splice(cord2, ship.length, ...arr);
    return this;
  }
  // if vertically will just need to keep cord2 the same but repeat cord 1
}

const playerBoard = new Board();

const carrier = new Ships(5, 0, false);
const battleship = new Ships(4, 0, false);
const cruiser = new Ships(3, 0, false);
const submarine = new Ships(3, 0, false);
const destroyer = new Ships(2, 0, false);

playerBoard.placeShip(carrier, 0, 0);
playerBoard.placeShip(battleship, 1, 0);
console.log(playerBoard);

const playerBoard2 = new Board();
playerBoard2.placeShip(submarine, 4, 4);
console.log(playerBoard2);

// playerBoard.board[0].splice(
//   0,
//   carrier.length,
//   "ca1",
//   "ca1",
//   "ca1",
//   "ca1",
//   "ca1"
// );
// console.log(playerBoard);

module.exports = Board;
