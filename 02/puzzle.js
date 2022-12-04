const fs = require("fs");
const readFileSync = fs.readFileSync;

const file = "moves";

const lines = readFileSync(file, { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

class Move {
  home;
  enemy;
  outcome;

  moveToPoints = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 };
  moveToString = {
    A: "Rock",
    B: "Paper",
    C: "Scissor",
    X: "Rock",
    Y: "Paper",
    Z: "Scissor",
  };
  moveToOutcome = {
    X: "Lose",
    Y: "Draw",
    Z: "Win",
  };

  constructor(moves) {
    let [enemy, home] = moves.split(" ");
    this.home = home;
    this.enemy = enemy;
    this.outcome = this.moveToOutcome[home];
  }

  winPoints() {
    const win = 6;
    const draw = 3;
    const lose = 0;

    const enemyMoveString = this.moveToString[this.enemy];
    const homeMoveString = this.moveToString[this.home];

    if (enemyMoveString == homeMoveString) return draw;

    switch (`${enemyMoveString}${homeMoveString}`) {
      case "RockPaper":
        return win;
      case "RockScissor":
        return lose;
      case "PaperRock":
        return lose;
      case "PaperScissor":
        return win;
      case "ScissorRock":
        return win;
      case "ScissorPaper":
        return lose;
    }
  }

  movePoints() {
    return this.moveToPoints[this.home];
  }

  movePointsFromOutcome() {
    const Rock = 1;
    const Paper = 2;
    const Scissor = 3;

    const enemyMoveString = this.moveToString[this.enemy];
    const outcomeString = this.outcome;
    if (outcomeString == "Draw") return this.moveToPoints[this.enemy];
    switch (`${enemyMoveString}${outcomeString}`) {
      case "RockWin":
        return Paper;
      case "RockLose":
        return Scissor;
      case "PaperLose":
        return Rock;
      case "PaperWin":
        return Scissor;
      case "ScissorWin":
        return Rock;
      case "ScissorLose":
        return Paper;
    }
  }

  winPointsFromOutcome() {
    const outcomeString = this.outcome;
    switch (outcomeString) {
      case "Win":
        return 6;
      case "Draw":
        return 3;
      case "Lose":
        return 0;
    }
  }

  points() {
    return this.winPoints() + this.movePoints();
  }
  points2() {
    return this.winPointsFromOutcome() + this.movePointsFromOutcome();
  }

  toString() {
    // return `Enemy move: ${this.moveToString[this.enemy]}, My move: ${
    //   this.moveToString[this.home]
    // }. points: ${this.winPoints()}, move points: ${this.movePoints()}`;
    return `Enemy move: ${
      this.moveToString[this.enemy]
    }, My move: ${this.movePointsFromOutcome()}, ${this.winPointsFromOutcome()}`;
  }
}

let total = 0;
lines.forEach((line) => {
  const move = new Move(line);
  total += move.points2();
});

console.log(total);

// const testMoves = [
//   new Move("A X"),
//   new Move("A Y"),
//   new Move("A Z"),
//   new Move("B X"),
//   new Move("B Y"),
//   new Move("B Z"),
//   new Move("C X"),
//   new Move("C Y"),
//   new Move("C Z"),
// ];

// testMoves.forEach((move) => {
//   console.log(move.toString());
// });
