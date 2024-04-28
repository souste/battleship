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

module.exports = Ships;
