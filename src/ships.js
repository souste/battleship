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

  isSunk() {
    if (this.timesHit === this.length) {
      this.sunk = true;
    }
    return this;
  }
}

const carrier = new Ships(5, 0, false);
const battleship = new Ships(4, 0, false);
const cruiser = new Ships(3, 0, false);
const submarine = new Ships(3, 0, false);
const destroyer = new Ships(2, 0, false);

////////////////////////////////////////////////////////////////////////////

// Row and Column indexes for Gameboard are the coordinates you will use, starting at 0 and going to 9
// In order to place a ship you will need to specify length (already done)  as well as position and direction
// You can then use the position as the starting point for your ship and direction to know which way to fill
// In doing so you will replace the null value at a given index !coords[x][y]! with some value to indicate a ship is there

// Finally you need a method to create the ships
// You can do this either by user input, or just by using hardcoded values in the Gameboard creator function.
// You will also need to store all your ships in a list, and have a way to call upon the correct ship when the shot hits

module.exports = Ships;
