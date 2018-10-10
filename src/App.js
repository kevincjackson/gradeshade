import React, { Component } from "react";
import "./App.css";
import ItemList from "./ItemList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [
        { name: "a", points: 10, max: 11 },
        { name: "a", points: 20, max: 22 },
        { name: "a", points: 30, max: 33 }
      ]
    };
  }

  render() {
    return (
      <div className="App">
        <header className="header">Gradeshade</header>
        <ItemList items={this.state.items} />
      </div>
    );
  }
}

export default App;
