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
        arr.push(ship.boardName);
      }
      this.board[rowCord].splice(colCord, ship.length, ...arr);
      return this;
    } else if (direction === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        this.board[rowCord + i].splice(colCord, 1, ship.boardName);
      }
      return this;
    }
  }
}

const playerBoard = new Board();

const carrier = new Ships(5, 0, false, "Crr");
const battleship = new Ships(4, 0, false, "Bat");
const cruiser = new Ships(3, 0, false, "Cru");
const submarine = new Ships(3, 0, false, "Sub");
const destroyer = new Ships(2, 0, false, "Des");

playerBoard.placeShip(carrier, 0, 0, "horizontal");
playerBoard.placeShip(battleship, 1, 0, "horizontal");
console.log(playerBoard);

const playerBoard2 = new Board();
playerBoard2.placeShip(carrier, 0, 1, "vertical");
console.log(playerBoard2);

playerBoard3 = new Board();
playerBoard3.placeShip(carrier, 0, 0, "horizontal");
playerBoard3.placeShip(battleship, 1, 0, "vertical");
playerBoard3.placeShip(cruiser, 4, 3, "horizontal");
playerBoard3.placeShip(submarine, 5, 4, "vertical");
playerBoard3.placeShip(destroyer, 8, 6, "vertical");
console.log(playerBoard3);

module.exports = Board;
