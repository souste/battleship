const Ships = require("./ships");
const Board = require("./board");

class Player {
  constructor() {
    this.myBoard = new Board();
    this.computerBoard = new Board();
  }

  compShipPlacement() {
    const ships = [
      stephen.computerBoard.carrier,
      stephen.computerBoard.battleship,
      stephen.computerBoard.cruiser,
      stephen.computerBoard.submarine,
      stephen.computerBoard.destroyer,
    ];

    for (const ship of ships) {
      let placed = false;
      while (!placed) {
        const direction = this.randomDirection();
        const result = this.computerBoard.placeShip(
          ship,
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          direction
        );

        if (result) {
          placed = true;
        }
      }
    }
  }

  // need to limit end of ship length to 9
  // need to redo placement if board value !-- "number"

  randomDirection() {
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
      return "horizontal";
    } else {
      return "vertical";
    }
  }

  myAttack(coord1, coord2) {
    return this.computerBoard.receiveAttack(coord1, coord2);
  }
  compAttack(coord1, coord2) {
    return this.myBoard.receiveAttack(coord1, coord2);
  }
}

// Need some code for computer to randomly place ships on board with if statement for whether position has been filled previously ie. number not ship.boardnName
// then comp AI for placing hits on myBoard

stephen = new Player();
stephen.compShipPlacement();

stephen.myBoard.placeShip(stephen.myBoard.carrier, 0, 0, "horizontal");
stephen.myBoard.placeShip(stephen.myBoard.battleship, 1, 0, "vertical");
stephen.myBoard.placeShip(stephen.myBoard.cruiser, 4, 3, "horizontal");
stephen.myBoard.placeShip(stephen.myBoard.submarine, 5, 4, "vertical");
stephen.myBoard.placeShip(stephen.myBoard.destroyer, 8, 6, "vertical");

console.log("stephen/ my board", stephen.myBoard.board);

console.log("stephen/ comp board", stephen.computerBoard.board);

module.exports = Player;
