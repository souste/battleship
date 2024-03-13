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
playerBoard.board[3][4] = "ship";
console.log(playerBoard);

module.exports = Board;
