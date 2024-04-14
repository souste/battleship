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
    item.style.color = "yellow";
    squareClickListener(item, i);
    computerBoardGrid.appendChild(item);
  }
}

function squareClickListener(item, index) {
  const shipValues = ["Crr", "Bat", "Cru", "Sub", "Des"];
  const row = Math.floor(index / 10);
  const column = index % 10;

  item.addEventListener("click", () => {
    if (shipValues.includes(item.innerText)) {
      item.style.backgroundColor = "red";
      item.innerText = "HIT!";
      item.style.color = "black";
      item.style.pointerEvents = "none";
      console.log(row);
      console.log(column);
      stephen.myAttack(row, column);
      console.log("compboard", stephen.computerBoard.board);
      console.log("myboard", stephen.myBoard.board);
      // need to change this to the player input name when that is set up
    } else {
      item.style.backgroundColor = "green";
      item.innerText = "MISS";
      item.style.color = "black";
      item.style.pointerEvents = "none";
      console.log(row);
      console.log(column);
      stephen.myAttack(row, column);
      console.log("compboard", stephen.computerBoard.board);
      console.log("myboard", stephen.myBoard.board);
      // need to change this to the player input name when that is set up
    }
  });
}

// Next Steps
// 1) Connect the click events to the array
// 2) Need to connect to computer automatic turns
// 3) Create event listeners to change colour for computer accordingly
// 4) Sort out the issue of Ship Placement

module.exports = { renderMyBoard, renderComputerBoard };
