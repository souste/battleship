// need to highlight where the ship will be placed - done!

// create a toggle button instead of a prompt - done!
// hide then only reveal computer board once all ships have been selected - done!
// change input to just enter input - done!
// Need a dialogue instruction box - done!
// Need to get rid of the extra turn since it is not a battleship rule - done!

// Enhance the boarder of the ship if sunk??? - done!
// need to disable event listener if too close to the edge of the board or if it goes on top of another ship - done!
// Need to improve the AI for the computer
// Separate DOM logic from Player Class
// Add actual ships to the ship squares in the DOM
// Sounds for a ship being hit

const Board = require("./board");
import battleshipIcon from "./assets/battleship-logo.jpg";
import battleshipImg from "./assets/battleship.PNG";
import carrierImg from "./assets/carrier.PNG";
import cruiserImg from "./assets/cruiser.PNG";
import destroyerImg from "./assets/destroyer.PNG";
import submarineImg from "./assets/submarine.PNG";
import "./styles/main.scss";

const content = document.querySelector(".content");

const titleImage = document.createElement("img");
titleImage.src = battleshipIcon;
titleImage.className = "title-image";

const imageContainer = document.createElement("div");
imageContainer.className = "image-container";
imageContainer.appendChild(titleImage);

content.appendChild(imageContainer);

const formContainer = document.createElement("div");
formContainer.className = "form-container";
const playerNameLabel = document.createElement("label");
playerNameLabel.className = "player-name-label";
const playerNameForm = document.createElement("form");
const playerNameInput = document.createElement("input");
playerNameInput.className = "player-name-input";
playerNameLabel.textContent = "Enter Your Name";

playerNameForm.appendChild(playerNameInput);
formContainer.appendChild(playerNameLabel);
formContainer.appendChild(playerNameForm);

content.appendChild(formContainer);

const boardsOuterContainer = document.createElement("div");
boardsOuterContainer.className = "boards-outer-container";
content.appendChild(boardsOuterContainer);

const display = document.createElement("p");
display.className = "display";
boardsOuterContainer.appendChild(display);
display.style.display = "none";

const axisButton = document.createElement("button");
axisButton.innerText = "Horizontal";
axisButton.className = "axis-button";
boardsOuterContainer.appendChild(axisButton);

const boardsContainer = document.createElement("div");
boardsContainer.className = "boards-container";
boardsOuterContainer.appendChild(boardsContainer);

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

// WINNER SCREEN

const winnerContainer = document.createElement("div");
winnerContainer.className = "winner-container";
const winnerDisplay = document.createElement("p");
winnerDisplay.className = "winner-display";
const playAgainButton = document.createElement("button");
playAgainButton.className = "axis-button";
playAgainButton.innerText = "Play Again";

winnerContainer.appendChild(winnerDisplay);
winnerContainer.appendChild(playAgainButton);
content.appendChild(winnerContainer);
winnerDisplay.innerText = "";
winnerContainer.style.display = "none";

class Player {
  constructor() {
    this.myBoard = new Board();
    this.computerBoard = new Board();
    this.computerAttacks = [];
    this.playerTurn = true;
    this.compShipPlacement();
    this.currentShipIndex = 0;
    this.currentDisplayIndex = 0;
    this.previousHitArr = [];
    this.shipPositions = [];
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
    this.allShipsSunk();
    this.compShipSunk();

    setTimeout(() => {
      this.compAttack();
      this.myShipSunk();
    }, 100);
    this.playerTurn = false;

    return result;
  }

  compAttack() {
    let coord1, coord2, coordValue, result;

    const attackAfterOneSecond = () => {
      coord1 = Math.floor(Math.random() * 10);
      coord2 = Math.floor(Math.random() * 10);
      coordValue = this.myBoard.board[coord1][coord2];

      this.previousHitArr.push(coordValue);
      console.log(this.previousHitArr);
      if (typeof this.previousHitArr[this.previousHitArr.length - 1] === "string") {
        console.log("this is a string");
        // result = this.compAdjacentTargets(row, col);
        result = this.myBoard.receiveMyAttack(coord1, coord2);
      } else if (
        typeof this.previousHitArr[this.previousHitArr.length - 1] === "number" ||
        typeof this.previousHitArr[this.previousHitArr.length - 1] === undefined
      ) {
        console.log("this is a number");
        result = this.myBoard.receiveMyAttack(coord1, coord2);
      }

      // console.log("compCordValue", coordValue);

      if (
        typeof coordValue === "number" ||
        coordValue === "Crr" ||
        coordValue === "Bat" ||
        coordValue === "Cru" ||
        coordValue === "Sub" ||
        coordValue === "Des"
      ) {
        this.playerTurn = true;
        this.refreshMyBoardAfterCompAttack();
        this.myShipSunk();
        this.allShipsSunk();
      } else {
        setTimeout(attackAfterOneSecond, 0);
      }
    };
    attackAfterOneSecond();
    this.refreshMyBoardAfterCompAttack();

    return result;
  }

  compAdjacentTargets(row, col) {
    const adjacentTargets = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];

    adjacentTargets.forEach(([row, column]) => {
      if (row >= 10 && row < 10 && column >= 10 && column < 10 && typeof this.myBoard.board[row][column] === "number") {
        this.previousHitArr.push([row, column]);
        this.myBoard.receiveMyAttack(row, column);
      }
    });
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

    this.shipPositions.forEach(({ ship, row, column, orientation }) => {
      let startSquare = myBoardGrid.children[row * 10 + column];
      let squareContent = document.createElement("div");
      startSquare.appendChild(squareContent);

      let shipImage = document.createElement("img");
      shipImage.className = "ship-image";
      shipImage.src = this.getShipImage(ship);
      squareContent.appendChild(shipImage);

      if (orientation === "horizontal") {
        shipImage.style.width = `${ship.length * 42}px`;
        shipImage.style.height = "40px";
      } else {
        shipImage.style.width = "40px";
        shipImage.style.height = `${ship.length * 42}px`;
      }
    });
  }

  myBoardSquares(item) {
    const stringsToCheck = ["Crr", "Bat", "Cru", "Sub", "Des"];
    if (stringsToCheck.includes(item.innerText)) {
      // item.style.backgroundColor = "black";
      item.style.color = "black";
    } else if (item.innerText === "Sunk") {
      item.style.backgroundColor = "purple";
      item.style.border = "2px solid black";
    } else if (item.innerText.startsWith("Hit")) {
      item.style.backgroundColor = "red";
      // item.style.color = "red";
      display.innerText = "The opponent has hit your ship";
    } else if (item.innerText === "Miss") {
      item.style.backgroundColor = "green";
      // item.style.color = "green";
      display.innerText = "The opponent has missed";
    } else {
      // item.style.color = "rgb(241, 240, 240)";
    }
  }

  myBoardShipSelect(item, index, arr) {
    let row = Math.floor(index / 10);
    let column = index % 10;
    let currentShip = this.getCurrentShipToPlace();
    let nextDisplay = this.getCurrentShipToDisplay();

    const isPlacementValid = (row, column, ship, orientation) => {
      for (let i = 0; i < ship.length; i++) {
        let newRow, newColumn;
        if (orientation === "horizontal") {
          newRow = row;
          newColumn = column + i;
        } else if (orientation === "vertical") {
          newRow = row + i;
          newColumn = column;
        }

        if (newRow >= 10 || newColumn >= 10) {
          console.log(`Invalid: Out of bounds at (${newRow}, ${newColumn})`);
          return false;
        }

        if (typeof arr[newRow][newColumn] !== "number") {
          console.log(`Invalid: Overlap at (${newRow}, ${newColumn})`);
          return false;
        }
      }
      return true;
    };

    const highlightSquares = () => {
      if (!isPlacementValid(row, column, currentShip, orientation)) {
        return;
      }

      for (let i = 0; i < currentShip.length; i++) {
        let newRow, newColumn;
        if (orientation === "horizontal") {
          newRow = row;
          newColumn = column + i;
        } else if (orientation === "vertical") {
          newRow = row + i;
          newColumn = column;
        }
        if (newRow >= 0 && newRow < 10 && newColumn >= 0 && newColumn < 10) {
          let squareIndex = newRow * 10 + newColumn;
          let square = myBoardGrid.children[squareIndex];
          square.classList.add("highlight");
        }
      }
    };

    const removeHighlight = () => {
      let highlightSquares = myBoardGrid.querySelectorAll(".highlight");
      highlightSquares.forEach((square) => {
        square.classList.remove("highlight");
      });
    };

    const clickHandler = () => {
      if (isPlacementValid(row, column, currentShip, orientation)) {
        playerObject.myBoard.placeShip(currentShip, row, column, orientation);
        playerObject.recordShipPosition(currentShip, row, column, orientation);
        this.currentShipIndex++;
        this.currentDisplayIndex++;
        this.renderMyBoard(arr);
        display.innerText = `${nextDisplay}`;
        removeHighlight();
        item.removeEventListener("mouseenter", highlightSquares);
        item.removeEventListener("mouseleave", removeHighlight);

        let startSquare = myBoardGrid.children[row * 10 + column];
        let squareContent = document.createElement("div");
        startSquare.appendChild(squareContent);

        let shipImage = document.createElement("img");
        shipImage.className = "ship-image";
        shipImage.src = this.getShipImage(currentShip);
        squareContent.appendChild(shipImage);

        if (orientation === "horizontal") {
          shipImage.style.width = `${currentShip.length * 42}px`;
          shipImage.style.height = "40px";
        } else {
          shipImage.style.width = "40px";
          shipImage.style.height = `${currentShip.length * 42}px`;
        }
      } else {
        display.innerText = `Invalid placement for ${currentShip.fullName}. Try again`;
      }
    };

    item.addEventListener("mouseenter", highlightSquares);
    item.addEventListener("mouseleave", removeHighlight);
    item.addEventListener("click", clickHandler);

    if (this.currentShipIndex === 5) {
      item.removeEventListener("mouseenter", highlightSquares);
      item.removeEventListener("mouseleave", removeHighlight);
      item.removeEventListener("click", clickHandler);
      computerBoardContainer.style.display = "block";
      axisButton.style.display = "none";
    }
  }

  recordShipPosition(ship, row, column, orientation) {
    this.shipPositions.push({ ship, row, column, orientation });
  }

  getShipImage(ship) {
    switch (ship.fullName) {
      case "Carrier":
        console.log("carrier");
        return carrierImg;
      case "Battleship":
        console.log("battleship");
        return battleshipImg;
      case "Cruiser":
        console.log("cruiser");
        return cruiserImg;
      case "Submarine":
        console.log("submarine");
        return submarineImg;
      case "Destroyer":
        console.log("destroyer");
        return destroyerImg;
      default:
        return "";
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

  getCurrentShipToDisplay() {
    const ships = [
      `${playerName}, place the Battleship`,
      `${playerName}, place the Cruiser`,
      `${playerName}, place the Submarine`,
      `${playerName}, place the Destroyer`,
      `${playerName}'s Turn.  Place a hit on your Opponent's Board. Good Luck!!`,
    ];

    return ships[this.currentDisplayIndex];
  }

  renderComputerBoard(arr) {
    let flatArr = arr.flat();

    for (let i = 0; i <= 99; i++) {
      let item = document.createElement("div");
      item.innerText = flatArr[i];
      item.className = "square";
      computerBoardGrid.appendChild(item);
      // item.style.color = "rgb(241, 240, 240)";
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
        // item.style.color = "red";
        item.style.pointerEvents = "none";
        playerObject.myAttack(row, column);
        display.innerText = `${playerName} has hit a ship!`;
        console.log("compboard", playerObject.computerBoard.board);
        console.log("myboard", playerObject.myBoard.board);
      } else {
        item.style.backgroundColor = "green";
        // item.style.color = "green";
        item.style.pointerEvents = "none";
        playerObject.myAttack(row, column);
        display.innerText = `${playerName} has missed`;
        playerObject.playerTurn = false;
        console.log("compboard", playerObject.computerBoard.board);
        console.log("myboard", playerObject.myBoard.board);
      }
    });
  }

  compShipSunk() {
    const ships = [
      this.computerBoard.carrier,
      this.computerBoard.battleship,
      this.computerBoard.cruiser,
      this.computerBoard.submarine,
      this.computerBoard.destroyer,
    ];
    ships.forEach((ship) => {
      if (ship.sunk === true) {
        computerBoardGrid.querySelectorAll(".square").forEach((square) => {
          if (square.innerText === ship.boardName) {
            square.style.backgroundColor = "purple";
            square.style.border = "2px solid black";
          }
        });
      }
    });
  }

  myShipSunk() {
    const ships = [
      this.myBoard.carrier,
      this.myBoard.battleship,
      this.myBoard.cruiser,
      this.myBoard.submarine,
      this.myBoard.destroyer,
    ];

    let sunkShipUpdated = false;

    ships.forEach((ship) => {
      if (ship.sunk === true) {
        this.myBoard.board.forEach((row, rowIndex) => {
          row.forEach((value, colIndex) => {
            if (value === `Hit ${ship.boardName}`) {
              this.myBoard.board[rowIndex][colIndex] = "Sunk";
              sunkShipUpdated = true;
            }
          });
        });
      }
    });
    if (sunkShipUpdated) {
      this.refreshMyBoardAfterCompAttack();
    }
  }

  allShipsSunk() {
    const allComputerShipsSunk = this.computerBoard.areAllShipsSunk();
    const allMyShipsSunk = this.myBoard.areAllShipsSunk();

    if (allComputerShipsSunk) {
      winnerContainer.style.display = "flex";
      display.style.display = "none";
      winnerDisplay.innerText = `${playerName} is the winner!!!! Well done! Play again?`;
    } else if (allMyShipsSunk) {
      winnerContainer.style.display = "flex";
      display.style.display = "none";
      winnerDisplay.innerText = `Sorry ${playerName} you lose. Play again?`;
    }
  }
}

let playerObject;
let playerName = playerNameInput.value;

playerNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    playerObject = new Player();

    playerObject.renderMyBoard(playerObject.myBoard.board);

    myBoardTitle.innerText = `${playerNameInput.value}'s Board`;
    playerName = playerNameInput.value;
    display.innerText = `${playerName}, place the Carrier.  Use Axis button to change direction`;
    boardsContainer.style.display = "flex";
    myBoardContainer.style.display = "block";
    formContainer.style.display = "none";
    playerNameInput.value = "";
    axisButton.style.display = "grid";
    titleImage.style.width = "500px";
    display.style.display = "block";
  }
});

playAgainButton.addEventListener("click", (event) => {
  event.preventDefault();

  myBoardGrid.innerText = "";
  computerBoardGrid.innerText = "";
  computerBoardContainer.style.display = "none";
  winnerContainer.style.display = "none";

  playerObject = new Player();
  playerObject.renderMyBoard(playerObject.myBoard.board);
  myBoardTitle.innerText = `${playerName}'s Board`;
  display.innerText = `${playerName}, place the Carrier.  Use Axis button to change direction`;
  boardsContainer.style.display = "flex";
  myBoardContainer.style.display = "block";
  formContainer.style.display = "none";
  playerNameInput.value = "";
  axisButton.style.display = "grid";
  titleImage.style.width = "500px";
  display.style.display = "block";
});

module.exports = Player;
