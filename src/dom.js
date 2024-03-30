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
  let flatArr = arr.flat();
  for (let i = 0; i <= 99; i++) {
    let item = document.createElement("div");
    item.innerText = flatArr[i];
    myBoardGrid.appendChild(item);
  }
}

function renderComputerBoard(arr) {
  let flatArr = arr.flat();
  for (let i = 0; i <= 99; i++) {
    let item = document.createElement("div");
    item.innerText = flatArr[i];
    squareClickListener(item);
    computerBoardGrid.appendChild(item);
  }
}

function squareClickListener(item) {
  const shipValues = ["Crr", "Bat", "Cru", "Sub", "Des"];

  item.addEventListener("click", () => {
    if (shipValues.includes(item.innerText)) {
      item.style.backgroundColor = "red";
    } else {
      item.style.backgroundColor = "green";
    }
  });
}

module.exports = { renderMyBoard, renderComputerBoard };
