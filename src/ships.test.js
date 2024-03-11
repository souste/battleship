const Ships = require("./ships");

test("Ships Class creates a ships object with length, hits and sunk key value pairs", () => {
  const carrier = new Ships(5, 0, false);
  expect(carrier).toEqual({ length: 5, timesHit: 0, sunk: false });
});

test("Hit method that increases the number of timesHit of a ship", () => {
  const carrier = new Ships(5, 0, false);
  expect(carrier.hit()).toEqual({ length: 5, timesHit: 1, sunk: false });
});

test("Hit method increases the number of timesHit, while also remembering previous hits", () => {
  const carrier = new Ships(5, 0, false);
  carrier.hit();
  expect(carrier.hit()).toEqual({ length: 5, timesHit: 2, sunk: false });
});

test("isSunk method turns the sunk value from false to true if timesHit equals length of ship", () => {
  const carrier = new Ships(5, 0, false);
  carrier.hit();
  carrier.hit();
  carrier.hit();
  carrier.hit();
  carrier.hit();
  expect(carrier.isSunk()).toEqual({ length: 5, timesHit: 5, sunk: true });
});

test("isSunk method will not change sunk value to true if timesHit is less than length", () => {
  const carrier = new Ships(5, 0, false);
  carrier.hit();
  carrier.hit();
  carrier.hit();
  expect(carrier.isSunk()).toEqual({ length: 5, timesHit: 3, sunk: false });
});
