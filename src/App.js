import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super()

    this.getEvents = this.getEvents.bind(this);

    this.state = {

    }
  }

  componentDidMount() {

  }

  getEvents(){

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Eventable</h2>
        </div>
        <p className="App-intro">

        </p>
      </div>
    );
  }
}

export default App;
