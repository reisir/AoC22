const lines = require("../getLines")("items");

// Group elves
let group = [];
const groups = [];
lines.forEach((line, i) => {
  const rucksack = line.split("");
  group.push(rucksack);
  if (i % 3 == 2) {
    groups.push(group);
    group = [];
  }
});

// Getting duplicates
const matches = [];
groups.forEach((group) => {
  group.sort((a, b) => a.length < b.length);
  group[0].every((item) => {
    const match = group[1].find((i) => i === item);
    const doubleMatch = group[2].find((i) => i === match);
    if (doubleMatch) return !matches.push(doubleMatch);
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
