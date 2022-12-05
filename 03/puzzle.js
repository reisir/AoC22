const lines = require("../getLines")("items");

// Getting duplicates
const matches = [];
lines.forEach((line, i) => {
  const rucksack = line.split("");
  const middle = rucksack.length / 2;

  const compartments = [rucksack.slice(0, middle), rucksack.slice(middle)];

  // use every to stop when the first match is found
  // foreach processed duplicates
  compartments[1].every((item) => {
    const match = compartments[0].find((i) => i === item);
    if (match) return !matches.push(match);
    return true;
  });
});

// Getting character codes
const characters = require("../alphabet");
const itemToPriority = new Map();

let priority = 1;
// Map characters to priority
characters.forEach((c) => itemToPriority.set(c.toLowerCase(), priority++));
characters.forEach((c) => itemToPriority.set(c, priority++));

const total = matches.reduce(
  (t, character) => (t += itemToPriority.get(character)),
  0
);

console.log(total);
