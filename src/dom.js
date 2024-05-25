import battleshipIcon from "./assets/battleship-logo.jpg";
import battleshipImg from "./assets/battleship.PNG";
import carrierImg from "./assets/carrier.PNG";
import cruiserImg from "./assets/cruiser.PNG";
import destroyerImg from "./assets/destroyer.PNG";
import submarineImg from "./assets/submarine.PNG";
import "./styles/main.scss";

export const initializeDom = () => {
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

  return {
    content,
    titleImage,
    imageContainer,
    formContainer,
    playerNameLabel,
    playerNameForm,
    playerNameInput,
    boardsOuterContainer,
    display,
    axisButton,
    boardsContainer,
    myBoardContainer,
    myBoardTitle,
    myBoardGrid,
    computerBoardGrid,
    computerBoardContainer,
    computerBoardTitle,
    winnerContainer,
    winnerDisplay,
    playAgainButton,
  };
};

export const getShipImage = (ship) => {
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
};
