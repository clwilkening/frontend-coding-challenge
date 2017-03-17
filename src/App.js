import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import {Grid, Row, Column, Clearfix} from 'react-bootstrap';
import Search from './components/Search';
import EventList from './components/EventList';
import EventForm from './components/EventForm';

class App extends Component {

  constructor() {
    super()

    this.getEvents = this.getEvents.bind(this);
    this.setEvents = this.setEvents.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.sortByTitle = this.sortByTitle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showForm = this.showForm.bind(this);
    this.handleFormTitle = this.handleFormTitle.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleStartTime = this.handleStartTime.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
    this.submitEvent = this.submitEvent.bind(this);
    this.state = {
      events: [],
      byTitle: false,
      search: '',
      showForm: false,
      newTitle: "",
      newStart: "",
      newStartTime: "",
      newEnd: "",
      newEndTime: "",
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
      this.setState({ search: e.target.value })
  }

  sortByDate(){
    this.setState({ byTitle: false });
  };

  sortByTitle(){
    this.setState({ byTitle: true });
  };

  showForm(){
    this.setState({ showForm: true })
  };

  handleFormTitle(e){
    this.setState({ newTitle: e.target.value})
  };
  handleStartDate(e){
    this.setState({ newStart: e.target.value})
  };
  handleStartTime(e){
    this.setState({ newStartTime: e.target.value})
  };
  handleEndDate(e){
    this.setState({ newEnd: e.target.value})
  };
  handleEndTime(e){
    this.setState({ newEndTime: e.target.value})
  };

  submitEvent(){
    const start_time = this.state.newStart + 'T' + this.state.newStartTime;
    const end_time = this.state.newEnd + 'T' + this.state.newEndTime;
    let title = this.state.newTitle;
    let eventObj = {title, start_time, end_time};
    let events = this.state.events;
    events.push(eventObj)
    this.setState({
      events,
      newTitle: "",
      newStart: "",
      newStartTime: "",
      newEnd: "",
      newEndTime: "",
      showForm: false
    });
  }

  render() {
    const {newStart, newTitle, newEnd, newStartTime, newEndTime} = this.state
    return (
      <div className="App">
        <div className="App-header">
          <h2>Eventable</h2>
        </div>
        { this.state.showForm === false ?
      <Grid>
        <div>
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
            showForm={this.showForm}
            />
          </div>
        </Grid>
          :
        <Grid>
          <EventForm
            newStart={newStart}
            newStartTime={newStartTime}
            newEnd={newEnd}
            newEndTime={newEndTime}
            newTitle={newTitle}
            handleFormTitle={this.handleFormTitle}
            handleStartDate={this.handleStartDate}
            handleStartTime={this.handleStartTime}
            handleEndDate={this.handleEndDate}
            handleEndTime={this.handleEndTime}
            submitEvent={this.submitEvent}
          />
          </Grid>
        }
      </div>
    );
  }
}

export default App;
