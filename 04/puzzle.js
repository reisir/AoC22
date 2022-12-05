const lines = require("../getLines")("ranges");

// Example data
// 62-77,36-50

// Answer
// 448

const Range = require("./Range");

let totalOverlaps = 0;
lines.forEach((line) => {
  const [r1, r2] = line.split(",");
  if (Range.covers(new Range(r1), new Range(r2))) totalOverlaps++;
});

console.log(totalOverlaps);
