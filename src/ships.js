class Ships {
  constructor(length, timesHit, sunk, boardName) {
    this.length = length;
    this.timesHit = timesHit;
    this.sunk = sunk;
    this.boardName = boardName;
  }

  hit() {
    this.timesHit++;
    this.isSunk();
    return this;
  }

  isSunk() {
    if (this.timesHit === this.length) {
      this.sunk = true;
    }
    return this;
  }
}

// You can do this either by user input, or just by using hardcoded values in the Gameboard creator function.
// You will also need to store all your ships in a list, and have a way to call upon the correct ship when the shot hits

module.exports = Ships;
