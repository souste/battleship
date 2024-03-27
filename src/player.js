const Ships = require("./ships");
const Board = require("./board");

class Player {
  constructor() {
    this.myBoard = new Board();
    this.computerBoard = new Board();
    this.compShipPlacement();
  }

  compShipPlacement() {
    const ships = [
      this.computerBoard.carrier,
      this.computerBoard.battleship,
      this.computerBoard.cruiser,
      this.computerBoard.submarine,
      this.computerBoard.destroyer,
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

  randomDirection() {
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
      return "horizontal";
    } else {
      return "vertical";
    }
  }

  myAttack(coord1, coord2) {
    const result = this.computerBoard.receiveAttack(coord1, coord2);
    return result;
  }
  compAttack() {
    coord1 = Math.floor(Math.random() * 10);
    coord2 = Math.floor(Math.random() * 10);
    return this.myBoard.receiveAttack(coord1, coord2);
  }
}

stephen = new Player();

stephen.myBoard.placeShip(stephen.myBoard.carrier, 0, 0, "horizontal");
stephen.myBoard.placeShip(stephen.myBoard.battleship, 1, 0, "vertical");
stephen.myBoard.placeShip(stephen.myBoard.cruiser, 4, 3, "horizontal");
stephen.myBoard.placeShip(stephen.myBoard.submarine, 5, 4, "vertical");
stephen.myBoard.placeShip(stephen.myBoard.destroyer, 8, 6, "vertical");

console.log("stephen/ my board", stephen.myBoard.board);

stephen.myAttack(2, 5);
console.log("stephen/ comp board after first attack", stephen.computerBoard.board);

stephen.myAttack(6, 3);
console.log("stephen/ comp board after second attack", stephen.computerBoard.board);

stephen.myAttack(2, 2);
console.log("stephen/ comp board after third attack", stephen.computerBoard.board);

stephen.myAttack(2, 3);
stephen.myAttack(2, 4);
stephen.myAttack(3, 5);
console.log("stephen/ comp board after forth attack", stephen.computerBoard.board);

module.exports = Player;
