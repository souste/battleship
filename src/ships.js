class Ships {
  constructor(length, timesHit, sunk) {
    this.length = length;
    this.timesHit = timesHit;
    this.sunk = sunk;
  }

  hit() {
    this.timesHit += 1;
    return this;
  }
}

const carrier = new Ships(5, 0, false);
const battleship = new Ships(4, 0, false);
const cruiser = new Ships(3, 0, false);
const submarine = new Ships(3, 0, false);
const destroyer = new Ships(2, 0, false);

module.exports = Ships;
