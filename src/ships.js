class Ships {
  constructor(length, timesHit, sunk, boardName, fullName) {
    this.length = length;
    this.timesHit = timesHit;
    this.sunk = sunk;
    this.boardName = boardName;
    this.fullName = fullName;
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
