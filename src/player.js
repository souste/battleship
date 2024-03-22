const Ships = require("./ships");
const Board = require("./board");

class Player {
  constructor() {
    this.carrier = new Ships(5, 0, false, "Crr");
    this.battleship = new Ships(4, 0, false, "Bat");
    this.cruiser = new Ships(3, 0, false, "Cru");
    this.submarine = new Ships(3, 0, false, "Sub");
    this.destroyer = new Ships(2, 0, false, "Des");
    this.board = new Board(
      this.carrier,
      this.battleship,
      this.cruiser,
      this.submarine,
      this.destroyer
    );
  }
}

playerOne = new Player();

console.log(playerOne);
// const carrier = new Ships(5, 0, false, "Crr");
// const battleship = new Ships(4, 0, false, "Bat");
// const cruiser = new Ships(3, 0, false, "Cru");
// const submarine = new Ships(3, 0, false, "Sub");
// const destroyer = new Ships(2, 0, false, "Des");

// playerBoard1 = new Board(carrier, battleship, cruiser, submarine, destroyer);
// playerBoard1.placeShip(carrier, 0, 0, "horizontal");
// playerBoard1.placeShip(battleship, 1, 0, "vertical");
// playerBoard1.placeShip(cruiser, 4, 3, "horizontal");
// playerBoard1.placeShip(submarine, 5, 4, "vertical");
// playerBoard1.placeShip(destroyer, 8, 6, "vertical");

// // Player 2 2 will have to be randomised I assume?

// playerBoard1.receiveAttack(0, 0);
// playerBoard1.receiveAttack(0, 1);
// playerBoard1.receiveAttack(0, 2);
// playerBoard1.receiveAttack(0, 3);
// playerBoard1.receiveAttack(0, 4);

// playerBoard1.receiveAttack(1, 0);
// playerBoard1.receiveAttack(2, 0);
// playerBoard1.receiveAttack(3, 0);
// playerBoard1.receiveAttack(4, 0);

// playerBoard1.receiveAttack(4, 3);
// playerBoard1.receiveAttack(4, 4);
// playerBoard1.receiveAttack(4, 5);

// playerBoard1.receiveAttack(5, 4);
// playerBoard1.receiveAttack(6, 4);
// playerBoard1.receiveAttack(7, 4);

// playerBoard1.receiveAttack(8, 6);
// playerBoard1.receiveAttack(9, 6);

// console.log(playerBoard1);

module.exports = Player;
