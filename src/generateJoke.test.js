const generateJoke = require("./generateJoke");

test("adds 1 + 2 to equal 3", () => {
  expect(generateJoke(1, 2)).toBe(3);
});
