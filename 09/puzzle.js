const lines = require("../getLines")("input");

// Wrong 6369 too high
// Because moveTail was moving tail in between comparisons

// Answer 1: 6209
// Answer 2: 2460

const uncharted = ".";
const visited = "#";
const start = "s";

const world = [[start]];
const rope = Array.from({ length: 10 }, () => [0, 0]);

function growWorld(cardinal) {
  const row = Array(world[0].length).fill(uncharted);
  switch (cardinal) {
    case "north":
      world.unshift(row);
      for (let i = 0; i < rope.length; i++) rope[i][0]++;
      break;
    case "south":
      world.push(row);
      break;
    case "west":
      world.map((r) => r.unshift(uncharted));
      for (let i = 0; i < rope.length; i++) rope[i][1]++;
      break;
    case "east":
      world.map((r) => r.push(uncharted));
      break;
    default:
      break;
  }
}

function moveHead(direction, head = h) {
  switch (direction) {
    case "U":
      head[0]--;
      break;
    case "D":
      head[0]++;
      break;
    case "L":
      head[1]--;
      break;
    case "R":
      head[1]++;
      break;
    default:
      break;
  }

  // grow world if head out of bounds
  if (head[0] === world.length) growWorld("south");
  if (head[1] === world[0].length) growWorld("east");
  if (head[0] < 0) growWorld("north");
  if (head[1] < 0) growWorld("west");
}

function moveTail(head, tail) {
  const sameCords = (c1, c2) => c1[0] === c2[0] && c1[1] === c2[1];
  const distance = (c1, c2) =>
    Math.max(Math.abs(c2[0] - c1[0]), Math.abs(c2[1] - c1[1]));

  // Save tail cords so they don't mutate before they're used in calculations
  const [t0, t1] = tail;

  if (head[0] > t0 && distance([t0, t1], head) > 1) tail[0]++;
  if (head[1] > t1 && distance([t0, t1], head) > 1) tail[1]++;
  if (head[0] < t0 && distance([t0, t1], head) > 1) tail[0]--;
  if (head[1] < t1 && distance([t0, t1], head) > 1) tail[1]--;
}

function markVisited(tail) {
  if (world[tail[0]][tail[1]] != start) world[tail[0]][tail[1]] = visited;
}

function visualize(rope) {
  const copy = JSON.parse(JSON.stringify(world));

  rope.forEach((piece, i) => {
    copy[piece[0]][piece[1]] = i;
  });

  console.log();
  let s = "";
  for (let x = 0; x < copy.length; x++) {
    s = "";
    for (let y = 0; y < copy[x].length; y++) {
      const element = copy[x][y];
      s += " " + element;
    }
    console.log(s);
  }
}

lines.forEach((line) => {
  let [direction, amount] = line.split(" ");
  amount = parseInt(amount);
  console.log("\n", line);
  for (let i = 0; i < amount; i++) {
    moveHead(direction, rope[0]);
    for (let i = 1; i < rope.length; i++) moveTail(rope[i - 1], rope[i]);
    markVisited(rope.at(-1));
    // visualize(rope);
  }
});

console.log(countVisited());

function countVisited() {
  return world.reduce(
    (total, row) =>
      total +
      row.reduce((total2, location) => total2 + (location === visited), 0),
    1 // the start counts as visited
  );
}
