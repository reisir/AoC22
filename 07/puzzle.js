const lines = require("../getLines")("commands");

// Answer 1: 1391690
// Answer 2: 5469168

// The File class only exists so I can call size() on it in Directory.size
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
      (total, item) => total + item.size(),
      0
    );
}

// Initialize "file system"
const root = new Directory("/");
let currentDirectory = root;

// Iterate over commands
for (let i = 0; i < lines.length; i++) {
  // Get current line and useful substrings
  const line = lines[i];
  const cmd = line.slice(0, 4);
  const rest = line.slice(4).trim();
  const last = line.at(-1);

  switch (cmd) {
    case "$ ls": {
      // noop
      continue;
    }
    case "$ cd": {
      if (last == "/") {
        // navigate to root
        currentDirectory = root;
        continue;
      }
      if (last == ".") {
        // navigate to parent
        currentDirectory = currentDirectory.parent;
        continue;
      }
      // navigate to child
      currentDirectory = currentDirectory.children[rest];
      continue;
    }
    case "dir ": {
      // check if directory has been listed before
      // if not, create it
      if (!currentDirectory.children[rest])
        currentDirectory.children[rest] = new Directory(rest, currentDirectory);
      continue;
    }
    default: {
      // not a command or a directory, must be a file
      if (!parseInt(line)) continue; // skip lines that don't have a number just in case
      currentDirectory.files.push(new File(parseInt(line)));
      continue;
    }
  }
}

// Sizes for part 1
const notableSize = 100000;

// Sizes for part 2
const totalSpace = 70000000;
const neededSpace = 30000000;
const usedSpace = root.size();
const minSize = neededSpace - (totalSpace - usedSpace);

/**
 * Function that calls transformer on each of a Directory objects children
 * @param {Directory} directory Directory object
 * @param {Function} transformer function that accepts two arguments, (size, accumulator)
 * @param {any} accumulator value passed to each transform call
 * @returns {any} `accumulator`
 */
function reduceChildren(directory, transformer, accumulator = 0) {
  Object.values(directory.children).forEach((child) => {
    accumulator = reduceChildren(child, transformer, accumulator);
  });
  return transformer(directory.size(), accumulator);
}

// Adds directory size to total if it's under notableSize
const totaller = (size, total) => (size <= notableSize ? total + size : total);

// Returns size if it's lower than the current lowest size found
const spacesniffer = (size, lowest) =>
  lowest >= size && size >= minSize ? size : lowest;

console.log(reduceChildren(root, totaller));
console.log(reduceChildren(root, spacesniffer, usedSpace));
