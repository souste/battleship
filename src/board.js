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
}

const playerBoard = new Board();

const carrier = new Ships(5, 0, false);
const battleship = new Ships(4, 0, false);
const cruiser = new Ships(3, 0, false);
const submarine = new Ships(3, 0, false);
const destroyer = new Ships(2, 0, false);

playerBoard.board[0].splice(
  0,
  carrier.length,
  "ca1",
  "ca1",
  "ca1",
  "ca1",
  "ca1"
);
console.log(playerBoard);

module.exports = Board;
