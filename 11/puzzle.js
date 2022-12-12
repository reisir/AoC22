const lines = require("../getLines")("input");
const log = console.log;

// Monkey in the Middle

// Answer 1: 95472
// Answer 2: 17926061332

const rounds = 10000;

// ModProduct trick from Lantis
// https://github.com/lantisescudo/Advent-of-Code-2022/blob/main/Day%2011/Day11Part2.py
let modproduct = 1;

class Monkey {
  items = [];
  name;
  inspected = 0;
  relief;
  operator;
  operationNumber;
  testNumber;
  testPassedMonkey;
  testFailedMonkey;

  constructor(name, relief = true) {
    this.name = name;
    this.relief = relief;
  }

  give = (item) => this.items.push(item);

  inspect(item) {
    this.inspected++;
    // if operationNumber is NaN, monkey formula uses current value
    const number = this.operationNumber || item;

    switch (this.operator) {
      case "+":
        item += number;
        break;
      case "*":
        item *= number;
        break;
    }

    // Part 1
    if (this.relief) return Math.floor(item / 3);

    // Part 2
    if (item > modproduct) item %= modproduct;
    return item;
  }

  throwItem() {
    let item = this.items.shift();
    if (item == null) return false;
    item = this.inspect(item);
    return item % this.testNumber == 0
      ? this.testPassedMonkey.give(item)
      : this.testFailedMonkey.give(item);
  }
}

// Initialize monkeys
const monkeys = [];
let currentMonkeyIndex = 0;
for (const line of lines) {
  let tokens = line.split(" ");
  tokens = tokens.filter((p) => !!p); // filter empty tokens out

  // Useful tokens
  const lastNumber = parseInt(tokens.at(-1));

  // Get current monkey
  const currentMonkey = monkeys[currentMonkeyIndex];

  switch (tokens?.[0]) {
    case "Monkey": {
      // Part 1
      // monkeys.push(new Monkey(lastNumber));
      monkeys.push(new Monkey(lastNumber, false));
      currentMonkeyIndex = parseInt(tokens[1]);
      break;
    }
    case "Starting": {
      for (let i = 0; i < tokens.length; i++) {
        const item = parseInt(tokens[i]);
        if (!Number.isNaN(item)) currentMonkey.give(item);
      }
      break;
    }
    case "Operation:": {
      currentMonkey.operator = tokens.at(-2);
      currentMonkey.operationNumber = lastNumber;
      break;
    }
    case "Test:": {
      currentMonkey.testNumber = lastNumber;
      break;
    }
    case "If": {
      switch (tokens[1]) {
        case "true:":
          currentMonkey.testPassedMonkey = lastNumber;
          break;
        case "false:":
          currentMonkey.testFailedMonkey = lastNumber;
          break;
      }
      break;
    }
    default:
      break;
  }
}

// Turn testPassedMonkey and testFailedMonkey from numbers to monkeys
monkeys.forEach((monkey) => {
  monkey.testPassedMonkey = monkeys[monkey.testPassedMonkey];
  monkey.testFailedMonkey = monkeys[monkey.testFailedMonkey];
});

// Make ModProduct LCM (lowest common multiple) of the monkeys division test numbers
monkeys.forEach((monkey) => {
  modproduct *= monkey.testNumber;
});

// Do monkey business
for (let i = 0; i < rounds; i++) {
  monkeys.forEach((monkey) => {
    while (monkey.throwItem()) {}
  });
}

// Calculate monkey business
monkeys.sort((a, b) => b.inspected - a.inspected);
log(monkeys[0].inspected * monkeys[1].inspected);
