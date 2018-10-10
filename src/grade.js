class Grade {
  constructor(points, max) {
    this.points = points;
    this.max = max;
    this.percentage = (points / max) * 100;
    this.pct = `${this.percentage.toFixed(2)}%`;
    this.letter = Grade.letterize(this.percentage);
    this.grade = `${this.letter} (${this.percentage.toFixed(2)}%)`;
  }

  toString() {
    return this.grade;
  }

  static letterize(pct) {
    if (pct >= 93) {
      return "A";
    } else if (pct >= 90 && pct < 93) {
      return "A-";
    } else if (pct >= 87 && pct < 90) {
      return "B+";
    } else if (pct >= 83 && pct < 87) {
      return "B";
    } else if (pct >= 80 && pct < 83) {
      return "B-";
    } else if (pct >= 77 && pct < 80) {
      return "C+";
    } else if (pct >= 73 && pct < 77) {
      return "C";
    } else if (pct >= 70 && pct < 73) {
      return "C-";
    } else if (pct >= 67 && pct < 70) {
      return "D+";
    } else if (pct >= 63 && pct < 67) {
      return "D";
    } else if (pct >= 60 && pct < 63) {
      return "D-";
    } else if (pct < 60) {
      return "F";
    } else {
      return "?";
    }
  }
}

export default Grade;
