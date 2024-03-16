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

  placeShip(ship, rowCord, colCord, direction) {
    if (direction === "horizontal") {
      let arr = [];
      for (let i = 0; i < ship.length; i++) {
        arr.push("ship");
      }
      this.board[rowCord].splice(colCord, ship.length, ...arr);
      return this;
    } else if (direction === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        this.board[rowCord + i].splice(colCord, 0, "ship");
      }
      return this;
    }
  }
}

const playerBoard = new Board();

const carrier = new Ships(5, 0, false);
const battleship = new Ships(4, 0, false);
const cruiser = new Ships(3, 0, false);
const submarine = new Ships(3, 0, false);
const destroyer = new Ships(2, 0, false);

playerBoard.placeShip(carrier, 0, 0, "horizontal");
playerBoard.placeShip(battleship, 1, 0, "horizontal");
console.log(playerBoard);

const playerBoard2 = new Board();
playerBoard2.placeShip(carrier, 0, 1, "vertical");
console.log(playerBoard2);

module.exports = Board;
