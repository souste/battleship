const content = document.querySelector(".content");
const title = document.createElement("h1");
title.innerText = "Battleships";
content.appendChild(title);

const boardsContainer = document.createElement("div");
boardsContainer.className = "boards-container";
content.appendChild(boardsContainer);

const myBoardContainer = document.createElement("div");
const myBoardTitle = document.createElement("h2");
myBoardTitle.innerText = "Player Board";

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

function renderMyBoard(arr) {
  myBoardGrid.innerHTML = "";
  let flatArr = arr.flat();
  for (let i = 0; i <= 99; i++) {
    let item = document.createElement("div");
    item.innerText = flatArr[i];
    item.className = "square";
    myBoardSquares(item);
    myBoardGrid.appendChild(item);
  }
}

function myBoardSquares(item) {
  if (item.innerText === "Hit") {
    item.style.backgroundColor = "red";
  }
  if (item.innerText === "Miss") {
    item.style.backgroundColor = "green";
  }
}

function renderComputerBoard(arr) {
  let flatArr = arr.flat();

  for (let i = 0; i <= 99; i++) {
    let item = document.createElement("div");
    item.innerText = flatArr[i];
    item.className = "square";
    computerBoardGrid.appendChild(item);
    // item.style.color = "yellow";
    // This will make the text invisible again

    computerBoardSquares(item, i);
  }
}

function computerBoardSquares(item, index) {
  const shipValues = ["Crr", "Bat", "Cru", "Sub", "Des"];
  const row = Math.floor(index / 10);
  const column = index % 10;

  item.addEventListener("click", () => {
    if (!stephen.playerTurn) return;
    if (shipValues.includes(item.innerText)) {
      item.style.backgroundColor = "red";
      item.innerText = "HIT!";
      item.style.color = "black";

      stephen.myAttack(row, column);
      // need to change this to the player input name when that is set up
    } else {
      item.style.backgroundColor = "green";
      item.innerText = "MISS";
      item.style.color = "black";

      stephen.myAttack(row, column);
      stephen.playerTurn = false;
      // need to change this to the player input name when that is set up
    }
  });
}

// Next Steps
// Recursion?? - if computer hits a previous Miss or achieves a Hit, it goes again? - Done!
// The player gets another turn it if achieves a Hit - Done!
// Player squares need to be deactivated until computer places hit
// Need to show once all of a ship as sunk, once whole length hit
// Allow Player to input name (need to replace all stephens here)
// Allow Player to place ships
// Apply ship images to the board
// Improve the computer AI

module.exports = { renderMyBoard, renderComputerBoard };
