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
