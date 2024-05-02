const Board = require("./board");

const content = document.querySelector(".content");
const title = document.createElement("h1");
title.innerText = "Battleships";
content.appendChild(title);

const formContainer = document.createElement("div");
const playerNameLabel = document.createElement("label");
const playerNameForm = document.createElement("form");
const playerNameButton = document.createElement("button");
playerNameButton.className = "player-name-button";
const playerNameInput = document.createElement("input");
playerNameInput.className = "player-name-input";

playerNameLabel.textContent = "Enter Your Name";
playerNameButton.textContent = "Start";

playerNameForm.appendChild(playerNameInput);
formContainer.appendChild(playerNameLabel);
formContainer.appendChild(playerNameForm);
formContainer.appendChild(playerNameButton);
content.appendChild(formContainer);

const boardsContainer = document.createElement("div");
boardsContainer.className = "boards-container";
content.appendChild(boardsContainer);

const myBoardContainer = document.createElement("div");
const myBoardTitle = document.createElement("h2");

const myBoardGrid = document.createElement("div");
myBoardGrid.className = "grid-container";

const computerBoardGrid = document.createElement("div");
computerBoardGrid.className = "grid-container";

const computerBoardContainer = document.createElement("div");
const computerBoardTitle = document.createElement("h2");
computerBoardTitle.innerText = "Opponent Board";

boardsContainer.appendChild(myBoardContainer);
myBoardContainer.appendChild(myBoardTitle);
myBoardContainer.appendChild(myBoardGrid);

boardsContainer.appendChild(computerBoardContainer);
computerBoardContainer.appendChild(computerBoardTitle);
computerBoardContainer.appendChild(computerBoardGrid);
// const { renderMyBoard, renderComputerBoard } = require("./dom");

// boardsContainer.style.display = "none";
// Reveal this again to hid boards after name input

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
      this.renderComputerBoard(this.computerBoard.board);
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
    this.renderMyBoard(this.myBoard.board);
  }

  renderMyBoard(arr) {
    myBoardGrid.innerHTML = "";
    let flatArr = arr.flat();
    for (let i = 0; i <= 99; i++) {
      let item = document.createElement("div");
      item.innerText = flatArr[i];
      item.className = "square";
      this.myBoardSquares(item);
      myBoardGrid.appendChild(item);

      this.myBoardShipSelect(item, i, arr);

      ////// Need this to only happen before the start of the game:
      placePlayerShip(item, flatArr);
    }
  }

  myBoardSquares(item) {
    if (item.innerText === "Hit") {
      item.style.backgroundColor = "red";
    }
    if (item.innerText === "Miss") {
      item.style.backgroundColor = "green";
    }
  }

  myBoardShipSelect(item, index, arr) {
    let row = Math.floor(index / 10);
    let column = index % 10;

    item.addEventListener("click", () => {
      console.log("row", row);
      console.log("column", column);
      playerObject.myBoard.placeShip(playerObject.myBoard.carrier, row, column, "horizontal");
      console.log(playerObject.myBoard.board);
      this.renderMyBoard(arr);
    });
  }

  renderComputerBoard(arr) {
    let flatArr = arr.flat();

    for (let i = 0; i <= 99; i++) {
      let item = document.createElement("div");
      item.innerText = flatArr[i];
      item.className = "square";
      computerBoardGrid.appendChild(item);
      // item.style.color = "yellow";
      // This will make the text invisible again

      this.computerBoardSquares(item, i);
    }
  }

  computerBoardSquares(item, index) {
    const shipValues = ["Crr", "Bat", "Cru", "Sub", "Des"];
    const row = Math.floor(index / 10);
    const column = index % 10;

    item.addEventListener("click", () => {
      if (!playerObject.playerTurn) return;
      if (shipValues.includes(item.innerText)) {
        item.style.backgroundColor = "red";
        item.innerText = "HIT!";
        item.style.color = "black";
        item.style.pointerEvents = "none";
        playerObject.myAttack(row, column);
        // console.log("compboard", playerObject.computerBoard.board);
        // console.log("myboard", playerObject.myBoard.board);
      } else {
        item.style.backgroundColor = "green";
        item.innerText = "MISS";
        item.style.color = "black";
        item.style.pointerEvents = "none";
        playerObject.myAttack(row, column);
        playerObject.playerTurn = false;
        // console.log("compboard", playerObject.computerBoard.board);
        // console.log("myboard", playerObject.myBoard.board);
      }
    });
  }
}

let playerObject;

playerNameButton.addEventListener("click", (event) => {
  event.preventDefault();

  playerObject = new Player();

  // playerObject.myBoard.placeShip(playerObject.myBoard.carrier, 0, 0, "horizontal");
  // playerObject.myBoard.placeShip(playerObject.myBoard.battleship, 1, 0, "vertical");
  // playerObject.myBoard.placeShip(playerObject.myBoard.cruiser, 4, 3, "horizontal");
  // playerObject.myBoard.placeShip(playerObject.myBoard.submarine, 5, 4, "vertical");
  // playerObject.myBoard.placeShip(playerObject.myBoard.destroyer, 8, 6, "vertical");

  playerObject.renderMyBoard(playerObject.myBoard.board);

  myBoardTitle.innerText = `${playerNameInput.value}'s Board`;
  boardsContainer.style.display = "flex";
  playerNameInput.value = "";
});

////////////////////////// PLACING SHIP LOGIC

function placePlayerShip(item) {
  item.addEventListener("mouseover", () => {
    for (let i = 0; i < 5; i++) {
      item.style.backgroundColor = "blue";
    }
  });

  item.addEventListener("mouseout", () => {
    item.style.backgroundColor = "yellow";
  });
}

module.exports = Player;
