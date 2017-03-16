import React, { Component } from 'react';
import './App.css';
import Search from './components/Search'
import EventList from './components/EventList';
// import config from './config.js'

class App extends Component {

  constructor() {
    super()

    this.getEvents = this.getEvents.bind(this);
    this.setEvents = this.setEvents.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.sortByTitle = this.sortByTitle.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      events: [],
      byTitle: false,
      search: '',
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
    this.setState({ events });
  };

  handleChange(e){
    let letter = e.target.value;
    // if (letter === " "){
    //   letter.replace(&nbsp;, "");
    //   console.log(letter)
    //   this.setState({search: letter})
    // } else {
      this.setState({ search: e.target.value })
  }

  sortByDate(){
    this.setState({ byTitle: false });
  };

  sortByTitle(){
    this.setState({ byTitle: true });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Eventable</h2>
        </div>
        <Search
          search={this.state.search}
          handleChange={this.handleChange}
        />
        <EventList
          search={this.state.search}
          events={this.state.events}
          byTitle={this.state.byTitle}
          sortByTitle={this.sortByTitle}
          sortByDate={this.sortByDate}
          />
      </div>
    );
  }
}

export default App;
