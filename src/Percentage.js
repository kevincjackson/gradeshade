import React from "react";
import Grade from "./grade";
import "tachyons";
const GOLDEN_RATIO = 1.61803398875;

class Percentage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 100,
      max: 100,
      graphWidth: 150
    };
  }

  onPointChange = e => this.setState({ points: parseFloat(e.target.value) });
  onMaxChange = e => this.setState({ max: parseFloat(e.target.value) });
  getGrade = () => new Grade(this.state.points, this.state.max);
  getPercentageGraph = () => {
    return (
      <div className="flex justify-center">
        <div
          className="flex items-end grey bg-pink"
          style={{
            height: this.state.graphWidth * GOLDEN_RATIO,
            width: this.state.graphWidth,
            opacity: 1 / GOLDEN_RATIO
          }}
        >
          <div
            className="grey bg-blue w-100"
            style={{
              height:
                (this.state.graphWidth *
                  GOLDEN_RATIO *
                  this.getGrade().percentage) /
                100
            }}
          />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <h3>{this.getGrade().grade}</h3>
        <div className="mb3">{this.getPercentageGraph()}</div>
        <input
          className="bg-transparent ba pa2 ma2 tc"
          min="0"
          name="points"
          onChange={this.onPointChange}
          placeholder="points"
          type="number"
          value={String(this.state.points)}
        />
        <br />
        <input
          className="bg-transparent ba pa2 ma2 tc"
          min="0"
          name="max"
          onChange={this.onMaxChange}
          placeholder="max"
          type="number"
          value={String(this.state.max)}
        />
      </div>
    );
  }
}

export default Percentage;
