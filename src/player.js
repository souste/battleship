const Ships = require("./ships");
const Board = require("./board");

class Player {
  constructor() {
    this.myBoard = new Board();
    this.computerBoard = new Board();
  }
}

stephen = new Player();

stephen.myBoard.placeShip(stephen.myBoard.carrier, 0, 0, "horizontal");
stephen.myBoard.placeShip(stephen.myBoard.battleship, 1, 0, "vertical");
stephen.myBoard.placeShip(stephen.myBoard.cruiser, 4, 3, "horizontal");
stephen.myBoard.placeShip(stephen.myBoard.submarine, 5, 4, "vertical");
stephen.myBoard.placeShip(stephen.myBoard.destroyer, 8, 6, "vertical");

console.log("stephen/ my board", stephen.myBoard.board);

stephen.computerBoard.placeShip(
  stephen.computerBoard.carrier,
  0,
  0,
  "horizontal"
);
stephen.computerBoard.placeShip(
  stephen.computerBoard.battleship,
  1,
  0,
  "vertical"
);
stephen.computerBoard.placeShip(
  stephen.computerBoard.cruiser,
  4,
  3,
  "horizontal"
);
stephen.computerBoard.placeShip(
  stephen.computerBoard.submarine,
  5,
  4,
  "vertical"
);
stephen.computerBoard.placeShip(
  stephen.computerBoard.destroyer,
  8,
  6,
  "vertical"
);

console.log("stephen/ comp board", stephen.computerBoard.board);

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

module.exports = Player;
