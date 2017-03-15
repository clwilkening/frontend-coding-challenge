import React, { Component } from 'react';
import './App.css';
import EventList from './components/EventList';
// import config from './config.js'

class App extends Component {

  constructor() {
    super()

    this.getEvents = this.getEvents.bind(this);
    this.setEvents = this.setEvents.bind(this);

    this.state = {
      events: []
    }
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents(){
    let key = require('./config.json')
    fetch('https://api.eventable.com/v1/events/', {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'token ' + key.token,
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
    })
    .then(res => {
      this.setEvents(res.results)
    })
    .catch(err => console.log(err));
  }

  setEvents(events){
    this.setState({
      events,
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Eventable</h2>
        </div>
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

export default App;
