const stream = require("../readStream")("./stream");
// const stream = require("../readStream")("./test");

// Answer 1: 1912
// Answer 2: 2122

const markerSize = 14;

const buffer = Array(markerSize);
let i = 0;
stream.on("data", (chunk) => {
  buffer.shift();
  buffer.push(chunk);
  const s = new Set(buffer);
  i++;
  if (s.size == markerSize && !s.has(undefined)) stream.destroy();
});

stream.on("close", function (err) {
  console.log(i);
});
