// const initializeGameUI = () => {
//   const content = document.querySelector(".content");

//   const title = document.createElement("h1");
//   title.innerText = "Battleships";
//   content.appendChild(title);
// };

// const formContainer = document.createElement("div");
// const playerNameLabel = document.createElement("label");
// const playerNameForm = document.createElement("form");
// const playerNameButton = document.createElement("button");
// playerNameButton.className = "player-name-button";
// const playerNameInput = document.createElement("input");
// playerNameInput.className = "player-name-input";
// playerNameLabel.textContent = "Enter Your Name";
// playerNameButton.textContent = "Start";
// playerNameForm.appendChild(playerNameInput);
// formContainer.appendChild(playerNameLabel);
// formContainer.appendChild(playerNameForm);
// formContainer.appendChild(playerNameButton);
// content.appendChild(formContainer);

// const boardsContainer = document.createElement("div");
// boardsContainer.className = "boards-container";
// content.appendChild(boardsContainer);

// const myBoardContainer = document.createElement("div");
// const myBoardTitle = document.createElement("h2");
// // myBoardTitle.innerText = "Your Board";

// const myBoardGrid = document.createElement("div");
// myBoardGrid.className = "grid-container";

// const computerBoardContainer = document.createElement("div");
// const computerBoardTitle = document.createElement("h2");
// computerBoardTitle.innerText = "Opponent Board";

// const computerBoardGrid = document.createElement("div");
// computerBoardGrid.className = "grid-container";

// boardsContainer.appendChild(myBoardContainer);
// myBoardContainer.appendChild(myBoardTitle);
// myBoardContainer.appendChild(myBoardGrid);
// boardsContainer.appendChild(computerBoardContainer);
// computerBoardContainer.appendChild(computerBoardTitle);
// computerBoardContainer.appendChild(computerBoardGrid);

// // boardsContainer.style.display = "none";
// // Reveal this again to hid boards after name input

// const renderMyBoard = (myBoardGrid, arr) => {};

// const renderComputerBoard = (computerBoardGrid, arr) => {};

// renderMyBoard(arr) {
//   myBoardGrid.innerHTML = "";
//   let flatArr = arr.flat();
//   for (let i = 0; i <= 99; i++) {
//     let item = document.createElement("div");
//     item.innerText = flatArr[i];
//     item.className = "square";
//     this.myBoardSquares(item);
//     myBoardGrid.appendChild(item);

//     this.myBoardShipSelect(item, i, arr);

//     ////// Need this to only happen before the start of the game:
//     placePlayerShip(item, flatArr);
//   }
// }

// myBoardSquares(item) {
//   if (item.innerText === "Hit") {
//     item.style.backgroundColor = "red";
//   }
//   if (item.innerText === "Miss") {
//     item.style.backgroundColor = "green";
//   }
// }

// myBoardShipSelect(item, index, arr) {
//   let row = Math.floor(index / 10);
//   let column = index % 10;

//   item.addEventListener("click", () => {
//     playerObject.myBoard.placeShip(playerObject.myBoard.carrier, row, column, "horizontal");
//     // playerObject.myBoard.placeShip(playerObject.myBoard.battleship, 1, 0, "vertical");
//     // playerObject.myBoard.placeShip(playerObject.myBoard.cruiser, 4, 3, "horizontal");
//     // playerObject.myBoard.placeShip(playerObject.myBoard.submarine, 5, 4, "vertical");
//     // playerObject.myBoard.placeShip(playerObject.myBoard.destroyer, 8, 6, "vertical");
//     this.renderMyBoard(arr);
//   });
// }

// renderComputerBoard(arr) {
//   let flatArr = arr.flat();

//   for (let i = 0; i <= 99; i++) {
//     let item = document.createElement("div");
//     item.innerText = flatArr[i];
//     item.className = "square";
//     computerBoardGrid.appendChild(item);
//     // item.style.color = "yellow";
//     // This will make the text invisible again

//     this.computerBoardSquares(item, i);
//   }
// }

// computerBoardSquares(item, index) {
//   const shipValues = ["Crr", "Bat", "Cru", "Sub", "Des"];
//   const row = Math.floor(index / 10);
//   const column = index % 10;

//   item.addEventListener("click", () => {
//     if (!playerObject.playerTurn) return;
//     if (shipValues.includes(item.innerText)) {
//       item.style.backgroundColor = "red";
//       item.innerText = "HIT!";
//       item.style.color = "black";
//       item.style.pointerEvents = "none";
//       playerObject.myAttack(row, column);
//       // console.log("compboard", playerObject.computerBoard.board);
//       // console.log("myboard", playerObject.myBoard.board);
//     } else {
//       item.style.backgroundColor = "green";
//       item.innerText = "MISS";
//       item.style.color = "black";
//       item.style.pointerEvents = "none";
//       playerObject.myAttack(row, column);
//       playerObject.playerTurn = false;
//       // console.log("compboard", playerObject.computerBoard.board);
//       // console.log("myboard", playerObject.myBoard.board);
//     }
//   });
// }

// module.exports = { initializeGameUI, renderMyBoard, renderComputerBoard };
