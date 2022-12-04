// Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
// Find the top three elves carrying the most calories. How many total calories are they carrying?

const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input"),
  output: process.stdout,
  terminal: false,
});

// init arrays
let elves = [];
let tempElf = [];

// Elf class
class Elf {
  items = [];

  constructor(items) {
    this.items = items;
  }

  total() {
    return this.items.reduce((previous, current) => previous + current);
  }
}

// Process each line
rl.on("line", (line) => {
  line = parseInt(line);
  if (!line) {
    elves.push(new Elf(tempElf));
    tempElf = [];
    return;
  }
  tempElf.push(line);
});

// After all lines have been read
rl.on("close", function () {
  elves.sort((a, b) => b.total() - a.total());
  console.log(elves[0].total(), elves[1].total(), elves[2].total());
  topThreeCalories = elves[0].total() + elves[1].total() + elves[2].total();
  console.log(topThreeCalories);
});
