import React, { Component } from 'react';
import {FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';
// import fetch from 'whatwg-fetch';

class EventList extends Component {
  constructor(props){
    super(props);

    this.renderEvents = this.renderEvents.bind(this);
    this.inputRef = this.inputRef.bind(this);
  }

  // componentDidMount() {
  //   this.renderEvents()
  // }

  renderEvents() {
    const events = this.props.events;
    let { byTitle, byDate } = this.props;
    let eventElements = [];
    var eventArr = [];
      events.forEach((event) => {
        let start = moment(event.start_time).format('LLL');
        let end = moment(event.end_time).format('LLL')
        let timestamp = moment(event.start_time).format('x')
        eventArr.push({'title': event.title, 'start': start, 'end': end, 'url': event.url, 'stamp': timestamp});
      })
      if (byTitle === true) {
        let byTitle = _.sortBy(eventArr, ['title']);
        byTitle.forEach((event) => {
        eventElements.push(
          <div key={event.title}>
            <a href={event.url} target="_blank"><h4>{event.title}</h4></a>
            <p>Start: {event.start}</p>
            <p>End: {event.end}</p>
          </div>
        )
      })
      } else {
        let byDate = _.sortBy(eventArr, ['stamp']);
        byDate.forEach((event) => {
        eventElements.push(
          <div key={event.title}>
            <a href={event.url} target="_blank"><h4>{event.title}</h4></a>
            <p>Start: {event.start}</p>
            <p>End: {event.end}</p>
          </div>
          )
        })
      }
      return eventElements;
    };

  filter = () => {
    let setDate = this.props.sortByDate;
    let setTitle = this.props.sortByTitle;
    return(
      <div>
        Filter:
        <button onClick={() => setDate()}>Date</button>
        <button onClick={() => setTitle()}>Title</button>
      </div>
    )
  }

  inputRef() {
    let input = this.input.ref;
    console.log(input)
  }

  render() {
    return(
      <div>
        {this.filter()}
        {this.renderEvents()}
      </div>
    )
  }
};

export default EventList;
