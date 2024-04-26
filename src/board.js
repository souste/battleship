const Ships = require("./ships");

class Board {
  constructor() {
    this.board = this.generateBoard();
    this.carrier = new Ships(5, 0, false, "Crr");
    this.battleship = new Ships(4, 0, false, "Bat");
    this.cruiser = new Ships(3, 0, false, "Cru");
    this.submarine = new Ships(3, 0, false, "Sub");
    this.destroyer = new Ships(2, 0, false, "Des");
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
    if (direction === "horizontal" && colCoord + ship.length > this.board[rowCoord].length) {
      return false;
    }
    if (direction === "vertical" && rowCoord + ship.length > this.board.length) {
      return false;
    }

    if (typeof coordValue == "number" && coordValue <= 9) {
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
    } else if (coordValue == "Hit" || coordValue == "Miss") {
      console.log("You cannot hit the same place twice");
      return this;
    } else {
      const ship = this.findShipByName(coordValue);
      ship.hit();
      this.board[rowCoord].splice(colCoord, 1, "Hit");
      this.allShipsSunk();
    }
    return this;
  }

  findShipByName(name) {
    if (name === "Crr") {
      return this.carrier;
    }
    if (name === "Bat") {
      return this.battleship;
    }
    if (name === "Cru") {
      return this.cruiser;
    }
    if (name === "Sub") {
      return this.submarine;
    }
    if (name === "Des") {
      return this.destroyer;
    }
  }

  allShipsSunk() {
    for (const ship of [this.carrier, this.battleship, this.cruiser, this.submarine, this.destroyer]) {
      if (!ship || !ship.sunk) {
        return false;
      }
    }
    console.log("All Ships Have Been Sunk. You Win");
    return true;
  }
}

module.exports = Board;
