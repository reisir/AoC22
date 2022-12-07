// BAD
// This caused the wrong answers because I didn't
// take into account duplicate names
// Wrong answers
// 1038055
// 1019303

const lines = require("../getLines")("commands");

class File {
  _size;
  constructor(size) {
    this._size = size;
  }
  size = () => this._size;
}

class Directory {
  files = [];
  children = [];
  parent;
  name;
  constructor(name, parent = null) {
    this.name = name;
    this.parent = parent || name;
  }
  size = () =>
    [...this.files, ...this.children].reduce(
      (total, item) => (total += item.size()),
      0
    );
}

const notableSize = 100000;

const FileSystem = { ["/"]: new Directory("/") };
let dirName = "/";

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
      if (last == ".") {
        dirName = FileSystem[dirName].parent;
        continue;
      }
      if (!FileSystem[rest]) throw Error("Folder doesn't exist");
      dirName = rest;
      continue;
    }
    case "dir ": {
      //   if (!FileSystem[dirName].children.some((d) => d.name == rest)) {
      if (!Object.values(FileSystem).some((d) => d.name == rest)) {
        const child = new Directory(rest, dirName);
        FileSystem[rest] = child;
        FileSystem[dirName].children.push(child);
      }
      continue;
    }
    // No command, create a file
    default: {
      if (!parseInt(line)) continue;
      FileSystem[dirName].files.push(new File(parseInt(line)));
      continue;
    }
  }
}

console.log(JSON.stringify(FileSystem));

let total = 0;
for ([key, directory] of Object.entries(FileSystem)) {
  const dirSize = directory.size();
  if (dirSize <= notableSize) total += dirSize;
}

console.log(total);
