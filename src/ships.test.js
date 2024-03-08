const Ships = require("./ships");

test("Ships Class creates a ships object with length, hits and sunk value pairs", () => {
  const carrier = new Ships(5, 0, false);
  expect(carrier).toEqual({ length: 5, timesHit: 0, sunk: false });
});
