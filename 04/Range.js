class Range {
  low;
  high;

  constructor(s) {
    const [low, high] = s.split("-");
    this.low = parseInt(low);
    this.high = parseInt(high);
  }

  overlapLow(other) {
    return other >= this.low;
  }

  overlapHigh(other) {
    return other <= this.high;
  }

  covered(range) {
    return this.overlapLow(range.low) && this.overlapHigh(range.high);
  }

  static overlap(r1, r2) {
    if (r1.high <= r2.high && r1.high >= r2.low) return true;
    if (r2.high <= r1.high && r2.high >= r1.low) return true;
    if (r1.low >= r2.low && r1.low <= r2.high) return true;
    if (r2.low >= r1.low && r2.low <= r1.high) return true;
    return false;
  }
}

module.exports = Range;
