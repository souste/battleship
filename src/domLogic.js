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
      item.style.pointerEvents = "none";
      stephen.myAttack(row, column);
      // need to change this to the player input name when that is set up
      console.log("compboard", stephen.computerBoard.board);
      console.log("myboard", stephen.myBoard.board);
    } else {
      item.style.backgroundColor = "green";
      item.innerText = "MISS";
      item.style.color = "black";
      item.style.pointerEvents = "none";
      stephen.myAttack(row, column);
      stephen.playerTurn = false;
      // need to change this to the player input name when that is set up
      console.log("compboard", stephen.computerBoard.board);
      console.log("myboard", stephen.myBoard.board);
    }
  });
}

module.exports = { renderMyBoard, renderComputerBoard };
