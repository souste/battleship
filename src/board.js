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

  // Should I make the array prior to this?
  allShipsSunk() {
    for (const ship of [
      this.carrier,
      this.battleship,
      this.cruiser,
      this.submarine,
      this.destroyer,
    ]) {
      if (!ship || !ship.sunk) {
        return false;
      }
    }
    console.log("All Ships Have Been Sunk. You Win");
    return true;
  }
}

// playerBoard1 = new Board();
// playerBoard1.placeShip(playerBoard1.carrier, 0, 0, "horizontal");
// playerBoard1.placeShip(playerBoard1.battleship, 1, 0, "vertical");
// playerBoard1.placeShip(playerBoard1.cruiser, 4, 3, "horizontal");
// playerBoard1.placeShip(playerBoard1.submarine, 5, 4, "vertical");
// playerBoard1.placeShip(playerBoard1.destroyer, 8, 6, "vertical");

// // Player 2 2 will have to be randomised I assume?

// playerBoard1.receiveAttack(0, 0);
// playerBoard1.receiveAttack(0, 1);
// playerBoard1.receiveAttack(0, 2);
// playerBoard1.receiveAttack(0, 3);
// playerBoard1.receiveAttack(0, 4);

// playerBoard1.receiveAttack(1, 0);
// playerBoard1.receiveAttack(2, 0);
// playerBoard1.receiveAttack(3, 0);
// playerBoard1.receiveAttack(4, 0);

// playerBoard1.receiveAttack(4, 3);
// playerBoard1.receiveAttack(4, 4);
// playerBoard1.receiveAttack(4, 5);

// playerBoard1.receiveAttack(5, 4);
// playerBoard1.receiveAttack(6, 4);
// playerBoard1.receiveAttack(7, 4);

// playerBoard1.receiveAttack(8, 6);
// playerBoard1.receiveAttack(9, 6);

// console.log(playerBoard1);

module.exports = Board;
