import { initializeDom, getShipImage } from "./dom";
import Board from "./board";

document.addEventListener("DOMContentLoaded", function () {
  const dom = initializeDom();
  const axisButton = dom.axisButton;

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
      this.currentShipIndex = 0;
      this.currentDisplayIndex = 0;
      this.previousHitArr = [];
      this.shipPositions = [];
      this.computerShipPositions = [];
      this.compShipPlacement();
      this.renderComputerBoard(this.computerBoard.board);
    }

    // Set Up Utility Methods

    randomDirection() {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        return "horizontal";
      } else {
        return "vertical";
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
        `Place the Battleship`,
        `Place the Cruiser`,
        `Place the Submarine`,
        `Place the Destroyer`,
        `${playerName}'s Turn.  Place a hit on your Opponent's Board. Good Luck!!`,
      ];

      return ships[this.currentDisplayIndex];
    }

    // Player Ship Set Up Methods

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
            return false;
          }

          if (typeof arr[newRow][newColumn] !== "number") {
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
            let square = dom.myBoardGrid.children[squareIndex];
            square.classList.add("highlight");
          }
        }
      };

      const removeHighlight = () => {
        let highlightSquares = dom.myBoardGrid.querySelectorAll(".highlight");
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
          dom.display.innerText = `${nextDisplay}`;
          removeHighlight();
          item.removeEventListener("mouseenter", highlightSquares);
          item.removeEventListener("mouseleave", removeHighlight);
        } else {
          dom.display.innerText = `Invalid placement for ${currentShip.fullName}. Try again`;
        }
      };

      item.addEventListener("mouseenter", highlightSquares);
      item.addEventListener("mouseleave", removeHighlight);
      item.addEventListener("click", clickHandler);

      if (this.currentShipIndex === 5) {
        item.removeEventListener("mouseenter", highlightSquares);
        item.removeEventListener("mouseleave", removeHighlight);
        item.removeEventListener("click", clickHandler);
        dom.computerBoardContainer.style.display = "block";
        axisButton.style.display = "none";
        item.style.cursor = "auto";
      }
    }

    // Comp Ship Set Up Methods

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
              this.recordComputerShipPosition(ship, ship.startRow, ship.startColumn, direction);
            }
          }
        }
        this.renderComputerBoard(this.computerBoard.board);
      } else {
        return;
      }
    }

    // Rendering Methods

    renderMyBoard(arr) {
      dom.myBoardGrid.innerHTML = "";
      let flatArr = arr.flat();
      for (let i = 0; i <= 99; i++) {
        let item = document.createElement("div");
        item.innerText = flatArr[i];
        item.className = "square";
        item.id = "my-board-square";

        this.myBoardSquares(item);
        dom.myBoardGrid.appendChild(item);
        this.myBoardShipSelect(item, i, arr);
      }

      this.shipPositions.forEach(({ ship, row, column, orientation }, index) => {
        let startSquare = dom.myBoardGrid.children[row * 10 + column];
        let squareContent = document.createElement("div");
        startSquare.appendChild(squareContent);

        let shipImage = document.createElement("img");
        shipImage.className = "ship-image";
        shipImage.id = `ship${index + 1}`;
        shipImage.src = getShipImage(ship);
        if (orientation === "vertical") {
          shipImage.classList.add("vertical");
        }

        squareContent.appendChild(shipImage);

        if (orientation === "horizontal") {
          shipImage.style.width = `${ship.length * 42}px`;
          shipImage.style.height = "40px";
        } else if (orientation === "vertical") {
          shipImage.style.width = `${ship.length * 42}px`;
          shipImage.style.height = "40px";
          shipImage.style.transform = "rotate(90deg)";
        }
      });
    }

    renderComputerBoard(arr) {
      dom.computerBoardGrid.innerHTML = "";
      let flatArr = arr.flat();

      for (let i = 0; i <= 99; i++) {
        let item = document.createElement("div");
        item.innerText = flatArr[i];
        item.className = "square";
        dom.computerBoardGrid.appendChild(item);

        this.computerBoardSquares(item, i, arr);
      }
      this.renderComputerShipImages();
    }

    renderComputerShipImages() {
      this.computerShipPositions.forEach(({ ship, row, column, orientation }, index) => {
        let startSquareIndex = row * 10 + column;

        let startSquare = dom.computerBoardGrid.children[startSquareIndex];

        let shipImage = document.createElement("img");
        shipImage.className = "ship-image computer-ship hidden";

        shipImage.src = getShipImage(ship);

        if (orientation === "vertical") {
          shipImage.classList.add("vertical");
          shipImage.style.tranform = "rotate(90deg)";
        } else {
          shipImage.classList.add("horizontal");
          shipImage.classList.add("computer-horizontal-ship");
        }

        shipImage.id = `ship${index + 1}`;
        startSquare.appendChild(shipImage);

        if (orientation === "horizontal") {
          shipImage.style.width = `${ship.length * 42}px`;
          shipImage.style.height = "40px";
        } else {
          shipImage.style.width = `${ship.length * 42}px`;
          shipImage.style.height = "40px";
        }
      });
    }

    // Attack Methods

    myAttack(coord1, coord2) {
      if (!this.playerTurn) return;
      let result = this.computerBoard.receiveAttack(coord1, coord2);
      let coordValue = this.computerBoard.board[coord1][coord2];
      this.allShipsSunk();

      if (result.result === "hit") {
        dom.display.innerText = `${playerName} has hit a ship!`;
      } else if (result.result === "sunk") {
        dom.display.innerText = `${playerName} has sunk the ${result.shipName}!`;
      } else if (result.result === "miss") {
        dom.display.innerText = `${playerName} has missed`;
      } else if (result.result === "repeat") {
        dom.display.innerText = "You cannot hit the same place twice";
        return;
      }

      this.compShipSunk();

      setTimeout(() => {
        this.compAttack();
        this.myShipSunk();
      }, 1500);
      this.playerTurn = false;

      return result;
    }

    compAttack() {
      let coord1, coord2, result;

      const attackAfterOneSecond = () => {
        coord1 = Math.floor(Math.random() * 10);
        coord2 = Math.floor(Math.random() * 10);

        result = this.myBoard.receiveMyAttack(coord1, coord2);

        if (result.result === "repeat") {
          setTimeout(attackAfterOneSecond, 10);
          return;
        } else if (result.result === "hit") {
          dom.display.innerText = "The opponent has hit your ship";
        } else if (result.result === "sunk") {
          dom.display.innerText = `The opponent has sunk your ${result.shipName}`;
        } else {
          dom.display.innerText = "The opponent has missed";
        }

        this.refreshMyBoardAfterCompAttack();
        this.playerTurn = true;
      };
      attackAfterOneSecond();
    }

    // Event Handlers

    compAdjacentTargets(row, col) {
      const adjacentTargets = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ];

      adjacentTargets.forEach(([row, column]) => {
        if (
          row >= 10 &&
          row < 10 &&
          column >= 10 &&
          column < 10 &&
          typeof this.myBoard.board[row][column] === "number"
        ) {
          this.previousHitArr.push([row, column]);
          this.myBoard.receiveMyAttack(row, column);
        }
      });
    }

    refreshMyBoardAfterCompAttack() {
      this.renderMyBoard(this.myBoard.board);
    }

    myBoardSquares(item) {
      const stringsToCheck = ["Crr", "Bat", "Cru", "Sub", "Des"];
      if (stringsToCheck.includes(item.innerText)) {
        item.style.color = "transparent";
      } else if (item.innerText === "Sunk") {
        item.style.backgroundColor = "rgb(230, 165, 165)";
        item.innerHTML = '<div class="dot red-dot"></div>';
      } else if (item.innerText.startsWith("Hit")) {
        item.innerHTML = '<div class="dot red-dot"></div>';
      } else if (item.innerText === "Miss") {
        item.innerHTML = '<div class="dot black-dot"></div>';
      }
    }

    computerBoardSquares(item, index) {
      const shipValues = ["Crr", "Bat", "Cru", "Sub", "Des"];
      const row = Math.floor(index / 10);
      const column = index % 10;

      item.addEventListener("click", () => {
        if (!playerObject.playerTurn) return;

        const coordValue = playerObject.computerBoard.board[row][column];
        const isShip = shipValues.includes(coordValue);
        const hitMarker = document.createElement("div");
        hitMarker.classList.add("dot");
        hitMarker.id = "computer-dot";

        if (isShip) {
          hitMarker.classList.add("red-dot");
          dom.display.innerText = `${playerName} has hit a ship!`;
        } else {
          hitMarker.classList.add("black-dot");
          dom.display.innerText = `${playerName} has missed`;
        }

        item.appendChild(hitMarker);
        item.style.pointerEvents = "none";

        playerObject.myAttack(row, column);

        playerObject.playerTurn = false;
      });
    }

    recordShipPosition(ship, row, column, orientation) {
      this.shipPositions.push({ ship, row, column, orientation });
    }

    recordComputerShipPosition(ship, row, column, orientation) {
      this.computerShipPositions.push({ ship, row, column, orientation });
    }

    // Ship Sunk/Winner Methods

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
          dom.computerBoardGrid.querySelectorAll(".square").forEach((square) => {
            if (square.innerText === ship.boardName) {
              square.style.backgroundColor = "rgb(230, 165, 165)";
            }
          });
          const shipImage = dom.computerBoardGrid.querySelector(`#ship${ships.indexOf(ship) + 1}`);
          if (shipImage) {
            shipImage.classList.remove("hidden");
          }
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
        dom.winnerContainer.style.display = "flex";
        dom.display.style.display = "none";
        dom.winnerDisplay.innerText = `You are the winner!!!! Well done! Play again?`;
      } else if (allMyShipsSunk) {
        dom.winnerContainer.style.display = "flex";
        dom.display.style.display = "none";
        dom.winnerDisplay.innerText = `You lose. Play again?`;
      }
    }
  }

  let playerObject;
  let playerName = dom.playerNameInput.value;

  dom.playerNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      playerObject = new Player();

      playerObject.renderMyBoard(playerObject.myBoard.board);

      dom.myBoardTitle.innerText = `${dom.playerNameInput.value}'s Board`;
      playerName = dom.playerNameInput.value;
      dom.display.innerText = `${playerName}, place the Carrier.  Use Axis button to change direction`;
      dom.boardsContainer.style.display = "flex";
      dom.myBoardContainer.style.display = "block";
      dom.formContainer.style.display = "none";
      dom.playerNameInput.value = "";
      axisButton.style.display = "grid";
      dom.titleImage.style.width = "500px";
      dom.display.style.display = "block";
    }
  });

  dom.playAgainButton.addEventListener("click", (event) => {
    event.preventDefault();

    dom.myBoardGrid.innerText = "";
    dom.computerBoardGrid.innerText = "";
    dom.computerBoardContainer.style.display = "none";
    dom.winnerContainer.style.display = "none";

    playerObject = new Player();
    playerObject.renderMyBoard(playerObject.myBoard.board);
    dom.myBoardTitle.innerText = `${playerName}'s Board`;
    dom.display.innerText = `${playerName}, place the Carrier.  Use Axis button to change direction`;
    dom.boardsContainer.style.display = "flex";
    dom.myBoardContainer.style.display = "block";
    dom.formContainer.style.display = "none";
    dom.playerNameInput.value = "";
    dom.axisButton.style.display = "grid";
    dom.titleImage.style.width = "500px";
    dom.display.style.display = "block";
  });

  module.exports = Player;
});
