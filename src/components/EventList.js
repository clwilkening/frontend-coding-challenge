import React, { Component } from 'react';
import moment from 'moment';
// import fetch from 'whatwg-fetch';

class EventList extends Component {
  constructor(props){
    super(props);

    this.renderEvents = this.renderEvents.bind(this);
  }

  // componentDidMount() {
  //   this.renderEvents()
  // }

  renderEvents() {
    const events = this.props.events;
    let eventElements = [];
    events.forEach((event) => {
        let start = moment(event.start_time).format('LLL');
        let end = moment(event.end_time).format('LLL')

      eventElements.push(
        <div key={event.title}>
          <a href={event.url} target="_blank"><h4>{event.title}</h4></a>

          <p>Start: {start}</p>
          <p>End: {end}</p>
        </div>
      )
    })
    return eventElements;
  }

  // formatDates(){
  //   const events = this.props.events;
  //   let dates =
  // }

  render() {
    return(
      <div>
        {this.renderEvents()}
      </div>
    )
  }
};

export default EventList;
