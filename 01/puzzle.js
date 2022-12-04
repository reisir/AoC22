// Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?

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

// Process each line
rl.on("line", (line) => {
  line = parseInt(line);
  if (!line) {
    elves.push([...tempElf]);
    tempElf = [];
    return;
  }
  tempElf.push(line);
});

// After all lines have been read
rl.on("close", function () {
  let highestTotal = 0;
  let highestIndex = 0;
  elves.forEach((elf, i) => {
    let currentTotal = elf.reduce((previous, current) => previous + current);
    if (currentTotal > highestTotal) {
      highestIndex = i;
      highestTotal = currentTotal;
    }
  });

  console.log(`Highest total: ${highestTotal}, elf: ${highestIndex}`);
});
