const lines = require("../getLines")("ranges");

// Example data
// 62-77,36-50

const Range = require("./Range");

let totalOverlaps = 0;
lines.forEach((line) => {
  const [r1, r2] = line.split(",");
  const range1 = new Range(r1);
  const range2 = new Range(r2);
  if (Range.overlap(range1, range2)) totalOverlaps++;
});

console.log(totalOverlaps);
