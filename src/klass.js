var Grade = require("./grade");

class Klass {
  constructor(args = {}) {
    this.name = args.name;
    this.usesWeights = args.usesWeights;
    this.categories = args.categories;
    this.points = this.getPoints();
    this.max = this.getMax();
    this.grade = new Grade(this.points, this.max).grade;
  }

  getPoints() {
    return this.categories.reduce((catAcc, cat) => {
      let catPoints = cat.items.reduce((itemAcc, itm) => {
        return itemAcc + itm.points;
      }, 0);
      return catAcc + catPoints * (this.usesWeights ? cat.weight : 1);
    }, 0);
  }

  getMax() {
    return this.categories.reduce((catAcc, cat) => {
      let catMax = cat.items.reduce((itemAcc, itm) => {
        return itemAcc + itm.max;
      }, 0);
      return catAcc + catMax * (this.usesWeights ? cat.weight : 1);
    }, 0);
  }
}

const default_klass = {
  name: "Klass1",
  usesWeights: true,
  categories: [
    {
      name: "Category1",
      weight: 40,
      items: [
        {
          name: "Item1",
          points: 100,
          max: 100,
          date: new Date()
        },
        {
          name: "Item2",
          points: 90,
          max: 100,
          date: new Date()
        }
      ]
    },
    {
      name: "Category2",
      weight: 60,
      items: [
        {
          name: "Item1",
          points: 80,
          max: 100,
          date: new Date()
        },
        {
          name: "Item2",
          points: 70,
          max: 100,
          date: new Date()
        }
      ]
    }
  ]
};

module.exports = Klass;
