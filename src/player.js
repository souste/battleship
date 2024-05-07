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

const axisButton = document.createElement("button");
axisButton.innerText = "Horizontal";
content.appendChild(axisButton);

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

boardsContainer.style.display = "none";
myBoardContainer.style.display = "none";
computerBoardContainer.style.display = "none";
axisButton.style.display = "none";

let orientation = "horizontal";

const changeAxis = () => {
  if (axisButton.innerText === "Horizontal") {
    axisButton.innerText = "Vertical";
    orientation = "vertical";
  } else if (axisButton.innerText === "Vertical") {
    axisButton.innerText = "Horizontal";
    orientation = "horizontal";
  }
};

axisButton.addEventListener("click", changeAxis);

class Player {
  constructor() {
    this.myBoard = new Board();
    this.computerBoard = new Board();
    this.computerAttacks = [];
    this.playerTurn = true;
    this.compShipPlacement();
    this.currentShipIndex = 0;
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

    setTimeout(() => {
      this.compAttack();
    }, 1000);
    this.playerTurn = false;

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
      console.log("compCordValue", coordValue);

      if (
        typeof coordValue === "number" ||
        coordValue === "Crr" ||
        coordValue === "Bat" ||
        coordValue === "Cru" ||
        coordValue === "Sub" ||
        coordValue === "Des"
      ) {
        this.playerTurn = true;
      } else {
        setTimeout(attackAfterOneSecond, 1000);
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
    }
  }

  myBoardSquares(item) {
    const stringsToCheck = ["Crr", "Bat", "Cru", "Sub", "Des"];
    if (stringsToCheck.includes(item.innerText)) {
      item.style.backgroundColor = "black";
      item.style.color = "black";
    } else if (item.innerText === "Hit") {
      item.style.backgroundColor = "red";
      item.style.color = "red";
    } else if (item.innerText === "Miss") {
      item.style.backgroundColor = "green";
      item.style.color = "green";
    } else {
      item.style.color = "rgb(241, 240, 240)";
    }
  }

  // need to highlight where the ship will be placed
  // need to disable event listener if too close to the edge of the board
  // create a toggle button instead of a prompt - done!
  // hide then only reveal computer board once all ships have been selected - done!
  // change input to just enter input
  // Need a dialogue instruction box
  // Need to get rid of the extra turn since it is not a battleship rule

  myBoardShipSelect(item, index, arr) {
    let row = Math.floor(index / 10);
    let column = index % 10;

    const clickHandler = () => {
      let currentShip = this.getCurrentShipToPlace();
      let lcOrientation = orientation.toLowerCase();

      if (lcOrientation === "horizontal" || lcOrientation === "vertical") {
        playerObject.myBoard.placeShip(currentShip, row, column, lcOrientation);
        this.currentShipIndex++;
        this.renderMyBoard(arr);
      }
    };

    item.addEventListener("click", clickHandler);

    if (this.currentShipIndex === 5) {
      item.removeEventListener("click", clickHandler);
      computerBoardContainer.style.display = "block";
      axisButton.style.display = "none";
    }
  }

  getCurrentShipToPlace() {
    const ships = [
      this.myBoard.carrier,
      this.myBoard.battleship,
      this.myBoard.cruiser,
      this.myBoard.submarine,
      this.myBoard.destroyer,
    ];
    return ships[this.currentShipIndex];
  }

  renderComputerBoard(arr) {
    let flatArr = arr.flat();

    for (let i = 0; i <= 99; i++) {
      let item = document.createElement("div");
      item.innerText = flatArr[i];
      item.className = "square";
      computerBoardGrid.appendChild(item);
      item.style.color = "rgb(241, 240, 240)";
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
        item.style.color = "red";
        item.style.pointerEvents = "none";
        playerObject.myAttack(row, column);
        // console.log("compboard", playerObject.computerBoard.board);
        // console.log("myboard", playerObject.myBoard.board);
      } else {
        item.style.backgroundColor = "green";
        item.style.color = "green";
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

  playerObject.renderMyBoard(playerObject.myBoard.board);

  myBoardTitle.innerText = `${playerNameInput.value}'s Board`;
  boardsContainer.style.display = "flex";
  myBoardContainer.style.display = "block";
  formContainer.style.display = "none";
  playerNameInput.value = "";
  axisButton.style.display = "grid";
});

module.exports = Player;
