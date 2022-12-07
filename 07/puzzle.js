const lines = require("../getLines")("commands");

// Answer 1: 1391690
// Answer 2: 5469168

class File {
  _size;
  constructor(size) {
    this._size = size;
  }
  size = () => this._size;
}

class Directory {
  files = [];
  children = {};
  parent;
  name;
  constructor(name, parent = this) {
    this.name = name;
    this.parent = parent;
  }
  size = () =>
    [...this.files, ...Object.values(this.children)].reduce(
      (total, item) => (total += item.size()),
      0
    );
}

// Sizes for part 1
const notableSize = 100000;

const root = new Directory("/");
let currentDirectory = root;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const cmd = line.slice(0, 4);
  const rest = line.slice(4).trim();
  const last = line.at(-1);

  switch (cmd) {
    case "$ ls": {
      continue;
    }
    case "$ cd": {
      if (last == "/") {
        currentDirectory = root;
        continue;
      }
      if (last == ".") {
        currentDirectory = currentDirectory.parent;
        continue;
      }
      currentDirectory = currentDirectory.children[rest];
      continue;
    }
    case "dir ": {
      if (!currentDirectory.children[rest])
        currentDirectory.children[rest] = new Directory(rest, currentDirectory);
      continue;
    }
    // No command, create a file
    default: {
      if (!parseInt(line)) continue;
      currentDirectory.files.push(new File(parseInt(line)));
      continue;
    }
  }
}

// Sizes for part 2
const totalSpace = 70000000;
const neededSpace = 30000000;
const usedSpace = root.size();
const minSize = neededSpace - (totalSpace - usedSpace);

/**
 * Function that calls transformer on each of a Directory objects children
 * @param {Directory} dir Directory object
 * @param {Function} transformer function that accepts two arguments, (size, accumulator)
 * @param {any} accumulator value passed to each transform call
 * @returns {any} `accumulator`
 */
function reduceChildren(dir, transformer, accumulator = 0) {
  accumulator = transformer(dir.size(), accumulator);
  Object.values(dir.children).forEach((child) => {
    accumulator = reduceChildren(child, transformer, accumulator);
  });
  return accumulator;
}

// Adds directory size to total if it's under notableSize
const totaller = (size, total) => (size <= notableSize ? total + size : total);

// Returns size if it's lower than the current lowest size found
const spacesniffer = (size, lowest) =>
  lowest >= size && size >= minSize ? size : lowest;

console.log(reduceChildren(root, totaller));
console.log(reduceChildren(root, spacesniffer, usedSpace));
