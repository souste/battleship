const Ships = require("./ships");
const Board = require("./board");
const { renderMyBoard, renderComputerBoard } = require("./dom");

class Player {
  constructor() {
    this.myBoard = new Board();
    this.computerBoard = new Board();
    this.computerAttacks = [];
    this.playerTurn = true;
    this.compShipPlacement();
  }

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
      renderComputerBoard(this.computerBoard.board);
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

  myAttack(coord1, coord2) {
    if (!this.playerTurn) return;
    let result = this.computerBoard.receiveAttack(coord1, coord2);
    let coordValue = this.computerBoard.board[coord1][coord2];
    console.log("coordValue", coordValue);
    if (coordValue === "Miss") {
      setTimeout(() => {
        this.compAttack();
      }, 1000);
      this.playerTurn = false;
    }

    return result;
  }

  compAttack() {
    let coord1, coord2, coordValue, result;

    const attackAfterOneSecond = () => {
      coord1 = Math.floor(Math.random() * 10);
      coord2 = Math.floor(Math.random() * 10);
      coordValue = this.myBoard.board[coord1][coord2];
      result = this.myBoard.receiveAttack(coord1, coord2);
      this.refreshMyBoardAfterCompAttack();

      if (
        coordValue === "Miss" ||
        coordValue === "Hit" ||
        coordValue === "Crr" ||
        coordValue === "Bat" ||
        coordValue === "Cru" ||
        coordValue === "Sub" ||
        coordValue === "Des"
      ) {
        setTimeout(attackAfterOneSecond, 1000);
      } else {
        this.playerTurn = true;
      }
    };
    attackAfterOneSecond();

    return result;
  }

  refreshMyBoardAfterCompAttack() {
    renderMyBoard(this.myBoard.board);
  }
}

stephen = new Player();

stephen.myBoard.placeShip(stephen.myBoard.carrier, 0, 0, "horizontal");
stephen.myBoard.placeShip(stephen.myBoard.battleship, 1, 0, "vertical");
stephen.myBoard.placeShip(stephen.myBoard.cruiser, 4, 3, "horizontal");
stephen.myBoard.placeShip(stephen.myBoard.submarine, 5, 4, "vertical");
stephen.myBoard.placeShip(stephen.myBoard.destroyer, 8, 6, "vertical");

renderMyBoard(stephen.myBoard.board);

console.log("stephen/ my board", stephen.myBoard.board);
console.log("stephen/ comp board", stephen.computerBoard.board);

module.exports = Player;
