class Range {
  low;
  high;

  constructor(s) {
    const [low, high] = s.split("-");
    this.low = parseInt(low);
    this.high = parseInt(high);
  }

  overlapLow(other) {
    return other >= this.low && other <= this.high;
  }

  overlapHigh(other) {
    return other <= this.high && other >= this.low;
  }

  static covers(r1, r2) {
    return (
      (r1.overlapLow(r2.low) && r1.overlapHigh(r2.high)) ||
      (r2.overlapLow(r1.low) && r2.overlapHigh(r1.high))
    );
  }

  static overlaps(r1, r2) {
    return (
      r1.overlapHigh(r2.high) ||
      r2.overlapHigh(r1.high) ||
      r1.overlapLow(r2.low) ||
      r2.overlapLow(r1.low)
    );
  }
}

module.exports = Range;
