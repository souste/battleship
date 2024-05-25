const Ships = require("./ships");

class Board {
  constructor() {
    this.board = this.generateBoard();
    this.carrier = new Ships(5, 0, false, "Crr", "Carrier");
    this.battleship = new Ships(4, 0, false, "Bat", "Battleship");
    this.cruiser = new Ships(3, 0, false, "Cru", "Cruiser");
    this.submarine = new Ships(3, 0, false, "Sub", "Submarine");
    this.destroyer = new Ships(2, 0, false, "Des", "Destroyer");
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
  placeShip(ship, rowCoord, colCoord, direction) {
    const coordValue = this.board[rowCoord][colCoord];
    if (direction === "horizontal" && colCoord + ship.length > this.board[rowCoord].length) {
      return false;
    }
    if (direction === "vertical" && rowCoord + ship.length > this.board.length) {
      return false;
    }

    for (let i = 0; i < ship.length; i++) {
      if (direction === "horizontal") {
        if (typeof this.board[rowCoord][colCoord + i] === "string") {
          return false;
        }
      } else if (direction === "vertical") {
        if (typeof this.board[rowCoord + i][colCoord] === "string") {
          return false;
        }
      }
    }

    if (typeof coordValue == "number" && coordValue <= 9) {
      if (direction === "horizontal") {
        let arr = [];
        for (let i = 0; i < ship.length; i++) {
          arr.push(ship.boardName);
        }
        this.board[rowCoord].splice(colCoord, ship.length, ...arr);
      } else if (direction === "vertical") {
        for (let i = 0; i < ship.length; i++) {
          this.board[rowCoord + i].splice(colCoord, 1, ship.boardName);
        }
      }

      ship.startRow = rowCoord;
      ship.startColumn = colCoord;
      return this;
    }
    return false;
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
      this.areAllShipsSunk();
    }
    return this;
  }

  receiveMyAttack(rowCoord, colCoord) {
    let coordValue = this.board[rowCoord][colCoord];
    if (typeof coordValue == "number") {
      this.board[rowCoord].splice(colCoord, 1, "Miss");
      return this;
    } else if (coordValue.startsWith("Hit") || coordValue == "Miss" || coordValue == "Sunk") {
      console.log("You cannot hit the same place twice");
      return this;
    } else {
      const ship = this.findShipByName(coordValue);
      ship.hit();
      this.board[rowCoord].splice(colCoord, 1, `Hit ${ship.boardName}`);
      this.areAllShipsSunk();
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

  areAllShipsSunk() {
    for (const ship of [this.carrier, this.battleship, this.cruiser, this.submarine, this.destroyer]) {
      if (!ship || !ship.sunk) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Board;
