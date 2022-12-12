const lines = require("../getLines")("input");
const log = console.log;

// Answer 1: 14620
// Answer 2: BJFRHRFU

// Initialize Cathode-Ray Tube device
let cycle = 0;
let register = 1;
let screen = "";

// Screen data
const visible = "#";
const dark = " "; // default was ".", kinda hard to see

// Signal strength
const signalStrength = () => cycle * register;
let totalSignalStrength = 0;

function addSignalStrength() {
  // log("Debug :", cycle, register, signalStrength());
  totalSignalStrength += signalStrength();
}

function tick() {
  // Position on current line
  const position = cycle % 40;

  // Change line, checks if on cycle 0, 40, 80, 120 etc. but skips 0 (&& cycle)
  if (!position && cycle) screen += "\n";

  // Draw pixel if sprite position (register) is near enough
  screen += Math.abs(position - register) <= 1 ? visible : dark;

  // Tick
  cycle++;

  // Do part 1, checks if on tick 20, 60, 100, 140 etc.
  if (cycle % 40 === 20) addSignalStrength();
}

lines.forEach((line) => {
  let [instruction, number] = line.split(" ");
  if (number) number = parseInt(number);

  tick();
  switch (instruction) {
    case "noop":
      break;
    case "addx":
      tick();
      register += number;
      break;
  }
});

log("Part 1:", totalSignalStrength);
log("Part 2: Graphical Output");
log(screen);
