// https://github.com/tpatel/advent-of-code-2022/blob/main/day04.mjs
const fs = require("fs");
const readFileSync = fs.readFileSync;

const file = "";

const lines = readFileSync(file, { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline
