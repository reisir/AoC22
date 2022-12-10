const lines = require("../getLines")("test");

// Wrong 9328
// Wrong 9722

class Tree {
  visible = false;
  height;
  constructor(height = 0) {
    this.height = parseInt(height);
  }
}

class Forest {
  trees = [[]];
  padOuter() {
    const stump = new Tree(0);
    const stumpRow = new Array(this.trees[0].length).fill(stump);
    this.trees.forEach((row) => {
      row.unshift(stump);
      row.push(stump);
    });
    this.trees.unshift(stumpRow);
    this.trees.push(stumpRow);
  }
  checkVisible(x, y) {
    const tree = this.trees[x][y];

    let visible = true;
    for (let i = 0; i < this.trees[x].length - y; i++) {
      if (i === y) continue;
      if (tree.height >= this.trees[x][i].height) visible = false;
      else continue;
    }
    if (visible) return true;

    visible = true;
    for (let i = y; i < this.trees[x].length - y; i++) {
      if (i === y) continue;
      if (tree.height >= this.trees[x][i].height) visible = false;
      else continue;
    }
    if (visible) return true;

    visible = true;
    for (let i = 0; i < this.trees.length - x; i++) {
      if (i === x) continue;
      if (tree.height >= this.trees[i][y].height) {
        if (i > x) visible = false;
        else continue;
      }
    }
    if (visible) return true;

    visible = true;
    for (let i = x; i < this.trees.length - x; i++) {
      if (i === x) continue;
      if (tree.height >= this.trees[i][y].height) {
        if (i > x) visible = false;
        else continue;
      }
    }
    if (visible) return true;

    return false;
  }
  countVisible() {
    this.padOuter();
    let total = 0;
    for (let x = 0; x < this.trees.length; x++) {
      const row = this.trees[x];
      for (let y = 0; y < row.length; y++) {
        this.checkVisible(x, y) && console.log(x, y, total++);
      }
    }
    return total;
  }
}

const forest = new Forest();

lines.forEach((line, i) => {
  if (!forest.trees[i]) forest.trees.push([]);
  line.split("").forEach((tree) => forest.trees[i].push(new Tree(tree)));
});

console.log(forest.countVisible());
