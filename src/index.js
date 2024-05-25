import Ships from "./ships";
import Board from "./board";
import Player from "./player";
import Dom from "./dom";
import "./dom";
import "./styles/main.scss";

// Next Steps
// Recursion?? - if computer hits a previous Miss or achieves a Hit, it goes again? - Done!
// The player gets another turn it if achieves a Hit - Done!
// Player squares need to be deactivated until computer places hit - Done!
// Allow Player to input name (need to replace all stephens here) - Done!
// Stop Comp ships from intersecting - Done!
// Allow Player to place ships
// Apply ship images to the board
// Need to show once all of a ship as sunk, once whole length hit in Dom
// Add sound effects and maybe one second delay before player can click again (if they achieve a hit)
// Improve the computer AI
// Separate DOM from player class - figure out what the issue is with importing
// Player class needs major refactorin - figure out what the Player import bug is

// const shipSelectContainer = document.createElement("div");
// shipSelectContainer.className = "ship-select-container";

// ////////////////////////CARRIER///CAN GO BACK INTO PLAYER CLASS AFTER

// const carrierTitle = document.createElement("p");
// carrierTitle.innerText = "Carrier";
// let carrierSelect = document.createElement("div");
// carrierSelect.className = "carrier-select-container";

// for (let i = 0; i <= 4; i++) {
//   shipSelectItem = document.createElement("div");
//   shipSelectItem.innerText = "Crr";
//   shipSelectItem.className = "ship-select-item";
//   carrierSelect.appendChild(shipSelectItem);
// }

// //////////////////////BATTLESHIP

// const battleshipTitle = document.createElement("p");
// battleshipTitle.innerText = "Battleship";
// let battleshipSelect = document.createElement("div");
// battleshipSelect.className = "battleship-select-container";

// for (let i = 0; i <= 3; i++) {
//   shipSelectItem = document.createElement("div");
//   shipSelectItem.innerText = "Bat";
//   shipSelectItem.className = "ship-select-item";
//   battleshipSelect.appendChild(shipSelectItem);
// }

// ///////////////////////CRUISER

// const cruiserTitle = document.createElement("p");
// cruiserTitle.innerText = "Cruiser";
// let cruiserSelect = document.createElement("div");
// cruiserSelect.className = "cruiser-select-container";

// for (let i = 0; i <= 2; i++) {
//   shipSelectItem = document.createElement("div");
//   shipSelectItem.innerText = "Cru";
//   shipSelectItem.className = "ship-select-item";
//   cruiserSelect.appendChild(shipSelectItem);
// }

// /////////////////////SUBMARINE

// const submarineTitle = document.createElement("p");
// submarineTitle.innerText = "Submarine";
// let submarineSelect = document.createElement("div");
// submarineSelect.className = "submarine-select-container";

// for (let i = 0; i <= 2; i++) {
//   shipSelectItem = document.createElement("div");
//   shipSelectItem.innerText = "Sub";
//   shipSelectItem.className = "ship-select-item";
//   submarineSelect.appendChild(shipSelectItem);
// }

// /////////////////////DESTROYER

// const destroyerTitle = document.createElement("p");
// destroyerTitle.innerText = "Destroyer";
// let destroyerSelect = document.createElement("div");
// destroyerSelect.className = "destroyer-select-container";

// for (let i = 0; i <= 1; i++) {
//   shipSelectItem = document.createElement("div");
//   shipSelectItem.innerText = "Des";
//   shipSelectItem.className = "ship-select-item";
//   destroyerSelect.appendChild(shipSelectItem);
// }

// shipSelectContainer.appendChild(carrierTitle);
// shipSelectContainer.appendChild(carrierSelect);
// shipSelectContainer.appendChild(battleshipTitle);
// shipSelectContainer.appendChild(battleshipSelect);
// shipSelectContainer.appendChild(cruiserTitle);
// shipSelectContainer.appendChild(cruiserSelect);
// shipSelectContainer.appendChild(submarineTitle);
// shipSelectContainer.appendChild(submarineSelect);
// shipSelectContainer.appendChild(destroyerTitle);
// shipSelectContainer.appendChild(destroyerSelect);
// boardsContainer.appendChild(shipSelectContainer);
