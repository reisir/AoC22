const lines = require("../getLines")("./moves");

// Initial state of crate piles

// [S]                 [T] [Q]
// [L]             [B] [M] [P]     [T]
// [F]     [S]     [Z] [N] [S]     [R]
// [Z] [R] [N]     [R] [D] [F]     [V]
// [D] [Z] [H] [J] [W] [G] [W]     [G]
// [B] [M] [C] [F] [H] [Z] [N] [R] [L]
// [R] [B] [L] [C] [G] [J] [L] [Z] [C]
// [H] [T] [Z] [S] [P] [V] [G] [M] [M]
//  1   2   3   4   5   6   7   8   9

// Answer 1 RNZLFZSJH

// Initial state of crate piles
const crates = [
  ["H", "R", "B", "D", "Z", "F", "L", "S"],
  ["T", "B", "M", "Z", "R"],
  ["Z", "L", "C", "H", "N", "S"],
  ["S", "C", "F", "J"],
  ["P", "G", "H", "W", "R", "Z", "B"],
  ["V", "J", "Z", "G", "D", "N", "M", "T"],
  ["G", "L", "N", "W", "F", "S", "P", "Q"],
  ["M", "Z", "R"],
  ["M", "C", "L", "G", "V", "R", "T"],
];

const testCrates = [["Z", "N"], ["M", "C", "D"], ["P"]];

// Mutates crates
function CrateMover9000(crates, many, from, to) {
  for (let i = 0; i < many; i++) {
    crates[to - 1].push(crates[from - 1].pop());
  }
}

function CrateMover9001(crates, many, from, to) {
  const claw = [];
  for (let i = 0; i < many; i++) {
    claw.push(crates[from - 1].pop());
  }
  crates[to - 1].push(...claw.reverse());
}

function testMoves(crane) {
  crane(testCrates, 1, 2, 1);
  crane(testCrates, 3, 1, 3);
  crane(testCrates, 2, 2, 1);
  crane(testCrates, 1, 1, 2);
  return testCrates;
}

function realMoves(crane) {
  lines.forEach((line) => {
    const [x, many, y, from, z, to] = line.split(" ");
    crane(crates, many, from, to);
  });
  return crates;
}

function getCode(crates) {
  let code = "";
  crates.forEach((stack) => {
    code += stack.pop();
  });
  console.log(code);
}

getCode(realMoves(CrateMover9001));

// Failed CNZFCGJSM
