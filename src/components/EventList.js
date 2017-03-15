import React, { Component } from 'react';
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
      // console.log(event.title)
      eventElements.push(
        <div key={event.title}>
          <h4>{event.title}</h4>
        </div>
      )
    })
    return eventElements;
  }

  render() {
    return(
      <div>
        {this.renderEvents()}
      </div>
    )
  }
};

export default EventList;
