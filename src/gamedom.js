const Player = require("./player");
import "./dom";
import "./styles/main.scss";

stephen = new Player();
console.log("stephen", stephen);

stephen.myBoard.placeShip(stephen.myBoard.carrier, 0, 0, "horizontal");
stephen.myBoard.placeShip(stephen.myBoard.battleship, 1, 0, "vertical");
stephen.myBoard.placeShip(stephen.myBoard.cruiser, 4, 3, "horizontal");
stephen.myBoard.placeShip(stephen.myBoard.submarine, 5, 4, "vertical");
stephen.myBoard.placeShip(stephen.myBoard.destroyer, 8, 6, "vertical");

renderMyBoard(stephen.myBoard.board);

console.log("stephen/ my board", stephen.myBoard.board);
console.log("stephen/ comp board", stephen.computerBoard.board);
