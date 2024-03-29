const Ships = require("./ships");
const Board = require("./board");
const { renderMyBoard, renderComputerBoard } = require("./dom");

class Player {
  constructor() {
    this.myBoard = new Board();
    this.computerBoard = new Board();
    this.compShipPlacement();
  }

  renderMyBoard() {}

  compShipPlacement() {
    const flattenedBoard = this.computerBoard.board.flat();
    const stringsToCheck = ["Crr", "Bat", "Cru", "Sub", "Des"];
    const areAllStringsPresent = stringsToCheck.every((str) => flattenedBoard.includes(str));

    if (!areAllStringsPresent) {
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
    } else {
      return;
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

  // issue to get back to but each new attack changes the ship placement state of the computer board
  myAttack(coord1, coord2) {
    let result = this.computerBoard.receiveAttack(coord1, coord2);
    if (result) {
      this.compAttack();
    }
    return result;
  }

  compAttack() {
    let coord1 = Math.floor(Math.random() * 10);
    let coord2 = Math.floor(Math.random() * 10);
    return this.myBoard.receiveAttack(coord1, coord2);
  }
}

stephen = new Player();

stephen.myBoard.placeShip(stephen.myBoard.carrier, 0, 0, "horizontal");
stephen.myBoard.placeShip(stephen.myBoard.battleship, 1, 0, "vertical");
stephen.myBoard.placeShip(stephen.myBoard.cruiser, 4, 3, "horizontal");
stephen.myBoard.placeShip(stephen.myBoard.submarine, 5, 4, "vertical");
stephen.myBoard.placeShip(stephen.myBoard.destroyer, 8, 6, "vertical");

renderMyBoard(stephen.myBoard.board);
renderComputerBoard(stephen.computerBoard.board);

stephen.myAttack(2, 5);
stephen.myAttack(2, 6);
stephen.myAttack(3, 3);
// stephen.myAttack(4, 4);
// stephen.myAttack(4, 5);
// stephen.myAttack(4, 6);
// stephen.myAttack(4, 8);
// stephen.myAttack(5, 9);
// stephen.myAttack(6, 9);
// stephen.myAttack(7, 9);

console.log("stephen/ my board", stephen.myBoard.board);
console.log("stephen/ comp board", stephen.computerBoard.board);

module.exports = Player;
