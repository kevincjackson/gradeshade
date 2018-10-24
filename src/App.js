import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Title from "./Title";
import Content from "./Content";
import Footer from "./Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "percentage"
    };
  }

  onRouteChange = route => {
    if (route === "home") {
      this.setState({ route: "graph" });
    } else {
      this.setState({ route });
    }
  };

  render() {
    return (
      <div className="App">
        <Header onRouteChange={this.onRouteChange} />
        <Title />
        <Content route={this.state.route} onRouteChange={this.onRouteChange} />
        <div className="mv4">
          <Footer onRouteChange={this.onRouteChange} />
        </div>
      </div>
    );
  }
}

export default App;
