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

  // Will need an alert when UI built to inform player that ships overlap

  placeShip(ship, rowCoord, colCoord, direction) {
    const coordValue = this.board[rowCoord][colCoord];
    if (typeof coordValue == "number") {
      if (direction === "horizontal") {
        let arr = [];
        for (let i = 0; i < ship.length; i++) {
          arr.push(ship.boardName);
        }
        this.board[rowCoord].splice(colCoord, ship.length, ...arr);
        return this;
      } else if (direction === "vertical") {
        for (let i = 0; i < ship.length; i++) {
          this.board[rowCoord + i].splice(colCoord, 1, ship.boardName);
        }
        return this;
      } else {
        return this;
      }
    }
  }

  receiveAttack(rowCoord, colCoord) {
    let coordValue = this.board[rowCoord][colCoord];
    if (typeof coordValue == "number") {
      this.board[rowCoord].splice(colCoord, 1, "Miss");
      return this;
    } else {
      this.board[rowCoord].splice(colCoord, 1, "Hit");
      return this;
    }
  }
}

const carrier = new Ships(5, 0, false, "Crr");
const battleship = new Ships(4, 0, false, "Bat");
const cruiser = new Ships(3, 0, false, "Cru");
const submarine = new Ships(3, 0, false, "Sub");
const destroyer = new Ships(2, 0, false, "Des");

playerBoard1 = new Board();
playerBoard1.placeShip(carrier, 0, 0, "horizontal");
playerBoard1.placeShip(battleship, 1, 0, "vertical");
playerBoard1.placeShip(cruiser, 4, 3, "horizontal");
playerBoard1.placeShip(submarine, 5, 4, "vertical");
playerBoard1.placeShip(destroyer, 8, 6, "vertical");
console.log(playerBoard1);

playerBoard1.receiveAttack(0, 0);
playerBoard1.receiveAttack(1, 1);
console.log(playerBoard1);

module.exports = Board;
