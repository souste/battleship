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

//////////////////Bug in dom.js since can't import Player class, possibly due to co-dependencies with dom.js???

///////////////////////////////////////////////////////////////////////////////////// FORM
const content = document.querySelector(".content");
const formContainer = document.createElement("div");
const playerNameLabel = document.createElement("label");
const playerNameForm = document.createElement("form");
const playerNameButton = document.createElement("button");
playerNameButton.className = "player-name-button";
const playerNameInput = document.createElement("input");

playerNameLabel.textContent = "Enter Your Name";
playerNameButton.textContent = "Start";

playerNameForm.appendChild(playerNameInput);
formContainer.appendChild(playerNameLabel);
formContainer.appendChild(playerNameForm);
formContainer.appendChild(playerNameButton);
content.appendChild(formContainer);

playerNameButton.addEventListener("click", (event) => {
  event.preventDefault();
  createPlayer(playerNameInput.value);
});

playerName = "";

const createPlayer = function (name) {
  playerName = name;
  console.log(playerName);
};

playerName = new Player();
console.log(playerName);

playerName.myBoard.placeShip(playerName.myBoard.carrier, 0, 0, "horizontal");
playerName.myBoard.placeShip(playerName.myBoard.battleship, 1, 0, "vertical");
playerName.myBoard.placeShip(playerName.myBoard.cruiser, 4, 3, "horizontal");
playerName.myBoard.placeShip(playerName.myBoard.submarine, 5, 4, "vertical");
playerName.myBoard.placeShip(playerName.myBoard.destroyer, 8, 6, "vertical");

renderMyBoard(playerName.myBoard.board);

console.log("playerName/ my board", playerName.myBoard.board);
console.log("playerName/ comp board", playerName.computerBoard.board);

module.exports = Player;
