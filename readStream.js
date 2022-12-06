const fs = require("fs");

module.exports = (file) =>
  fs.createReadStream(file, {
    encoding: "utf-8",
    highWaterMark: 1,
  });
