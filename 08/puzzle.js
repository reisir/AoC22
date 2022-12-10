const lines = require("../getLines")("input");

// Wrong 9328
// Wrong 9722

// Answer 1: 1705

// Wrong 4312

// Answer 2: 371200

class Tree {
  visible = false;
  height;
  constructor(height = 0) {
    this.height = parseInt(height);
  }
}

trees = [[]];
function countVisible() {
  let total = 0;

  for (let x = 0; x < trees.length; x++) {
    const row = trees[x];
    let highest = -1;
    // check left to right
    for (let y = 0; y < row.length; y++) {
      if (highest >= trees[x][y].height) continue;
      trees[x][y].visible = true;
      highest = trees[x][y].height;
    }
    // check right to left
    highest = -1;
    for (let y = row.length - 1; y >= 0; y--) {
      if (highest >= trees[x][y].height) continue;
      trees[x][y].visible = true;
      highest = trees[x][y].height;
    }
  }

  for (let y = 0; y < trees[0].length; y++) {
    let highest = -1;
    // check top to bottom
    for (let x = 0; x < trees.length; x++) {
      if (highest >= trees[x][y].height) continue;
      trees[x][y].visible = true;
      highest = trees[x][y].height;
    }
    highest = -1;
    // check bottom to top
    for (let x = trees.length - 1; x >= 0; x--) {
      if (highest >= trees[x][y].height) continue;
      trees[x][y].visible = true;
      highest = trees[x][y].height;
    }
  }

  // count
  for (let x = 0; x < trees.length; x++) {
    const row = trees[x];
    for (let y = 0; y < row.length; y++) {
      const tree = row[y];
      if (tree.visible) total++;
    }
  }

  return total;
}

function findHighestScenicScore() {
  let highest = -1;
  for (let x = 0; x < trees.length; x++) {
    for (let y = 0; y < trees[x].length; y++) {
      const score = scenicScore(trees, x, y);
      if (highest < score) {
        highest = score;
      }
    }
  }
  return highest;
}

function scenicScore(forest, x, y) {
  const tree = forest[x][y];
  let totalScore = 1;
  let score = 0;
  // south
  for (let i = 1; i < forest.length - x; i++) {
    score++;
    if (forest[x + i][y].height >= tree.height) break;
  }
  totalScore *= score;
  score = 0;
  // east
  for (let i = 1; i < forest[0].length - y; i++) {
    score++;
    if (forest[x][y + i].height >= tree.height) break;
  }
  totalScore *= score;
  score = 0;
  // west
  for (let i = 1; i <= y; i++) {
    score++;
    if (forest[x][y - i].height >= tree.height) break;
  }
  totalScore *= score;
  score = 0;
  // north
  for (let i = 1; i <= x; i++) {
    score++;
    if (forest[x - i][y].height >= tree.height) break;
  }
  totalScore *= score;
  return totalScore;
}

lines.forEach((line, i) => {
  if (!trees[i]) trees.push([]);
  line.split("").forEach((tree) => trees[i].push(new Tree(tree)));
});

console.log(countVisible());

console.log(findHighestScenicScore());
