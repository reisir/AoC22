const lines = require("../getLines")("input");

// Wrong 6369 too high
// Because moveTail was moving tail in between comparisons

// Answer 1: 6209

const uncharted = ".";
const visited = "#";
const start = "s";

const world = [[start]];

h = [0, 0];
t = [0, 0];

function growWorld(cardinal) {
  const row = Array(world[0].length).fill(uncharted);
  switch (cardinal) {
    case "north":
      world.unshift(row);
      t[0]++;
      h[0]++;
      break;
    case "south":
      world.push(row);
      break;
    case "west":
      world.map((r) => r.unshift(uncharted));
      t[1]++;
      h[1]++;
      break;
    case "east":
      world.map((r) => r.push(uncharted));
      break;
    default:
      break;
  }
}

function moveTail() {
  const sameCords = (c1, c2) => c1[0] === c2[0] && c1[1] === c2[1];
  const distance = (c1, c2) =>
    Math.max(Math.abs(c2[0] - c1[0]), Math.abs(c2[1] - c1[1]));

  // Save t cords so they don't mutate before they're used in calculations
  const [t0, t1] = t;

  // jesus christ
  if (h[0] > t0 && distance([t0, t1], h) > 1) t[0]++;
  if (h[1] > t1 && distance([t0, t1], h) > 1) t[1]++;
  if (h[0] < t0 && distance([t0, t1], h) > 1) t[0]--;
  if (h[1] < t1 && distance([t0, t1], h) > 1) t[1]--;

  // check if "s"
  if (world[t[0]][t[1]] != start) world[t[0]][t[1]] = visited;
}

function moveHead(direction) {
  switch (direction) {
    case "U":
      h[0]--;
      break;
    case "D":
      h[0]++;
      break;
    case "L":
      h[1]--;
      break;
    case "R":
      h[1]++;
      break;
    default:
      break;
  }

  // grow world if head out of bounds
  if (h[0] === world.length) growWorld("south");
  if (h[1] === world[0].length) growWorld("east");
  if (h[0] < 0) growWorld("north");
  if (h[1] < 0) growWorld("west");
}

function visualize() {
  const copy = JSON.parse(JSON.stringify(world));

  //   console.log(h, t);
  copy[t[0]][t[1]] = "T";
  copy[h[0]][h[1]] = "H";

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

function countVisited() {
  return world.reduce(
    (total, row) =>
      total +
      row.reduce((total2, location) => total2 + (location === visited), 0),
    1 // start counts
  );
}

// parse directions
lines.forEach((line) => {
  let [direction, amount] = line.split(" ");

  amount = parseInt(amount);

  // console.log();
  // console.log(line);
  for (let i = 0; i < amount; i++) {
    moveHead(direction);
    moveTail();
    // visualize();
  }
});

visualize();

console.log(countVisited());
