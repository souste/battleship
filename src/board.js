class Board {
  constructor() {
    this.board = this.generateBoard();
  }

  generateBoard() {
    let board = [];
    for (let i = 0; i < 10; i++) {
      let boardRow = [];
      for (let j = 0; j < 10; j++) {
        boardRow.push(j);
      }
      board.push(boardRow);
    }
    return board;
  }
}

const playerBoard = new Board();
console.log(playerBoard);
playerBoard.board[0][3] = "Jeev";
console.log(playerBoard);

const playerBoard2 = new Board();
console.log(playerBoard2);

module.exports = Board;
