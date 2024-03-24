const Ships = require("./ships");
const Board = require("./board");

class Player {
  constructor() {
    this.myBoard = new Board();
    this.computerBoard = new Board();
  }

  compShipPlacement() {
    // Math.floor(Math.random()*10) generates a number from 0 - 9. - need to do this for each of the ships
    this.computerBoard.placeShip(
      this.myBoard.carrier,
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      "horizontal"
    );
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

// stephen.computerBoard.placeShip(
//   stephen.computerBoard.carrier,
//   0,
//   0,
//   "horizontal"
// );
// stephen.computerBoard.placeShip(
//   stephen.computerBoard.battleship,
//   1,
//   0,
//   "vertical"
// );
// stephen.computerBoard.placeShip(
//   stephen.computerBoard.cruiser,
//   4,
//   3,
//   "horizontal"
// );
// stephen.computerBoard.placeShip(
//   stephen.computerBoard.submarine,
//   5,
//   4,
//   "vertical"
// );
// stephen.computerBoard.placeShip(
//   stephen.computerBoard.destroyer,
//   8,
//   6,
//   "vertical"
// );

module.exports = Player;
