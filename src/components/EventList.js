import React, { Component } from 'react';
import {DropdownButton, MenuItem, Button} from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';

class EventList extends Component {
  constructor(props){
    super(props);

    this.renderEvents = this.renderEvents.bind(this);
  }

  renderEvents() {
    const events = this.props.events;
    let { byTitle, byDate } = this.props;
    let eventElements = [];
    let eventArr = [];
      events.forEach((event) => {
        let start = moment(event.start_time).format('LLL');
        let end = moment(event.end_time).format('LLL')
        let timestamp = moment(event.start_time).format('x')
        eventArr.push({'title': event.title, 'start': start, 'end': end, 'url': event.url, 'stamp': timestamp});
      })
      if (byTitle === true) {
        let byTitle = _.sortBy(eventArr, ['title']);
        byTitle.forEach((event) => {
          if (this.props.search === "") {
            eventElements.push(
              <div key={event.title}>
                <a href={event.url} target="_blank"><h4>{event.title}</h4></a>
                <p>Start: {event.start}</p>
                <p>End: {event.end}</p>
              </div>
            )
          } else {
            let title = event.title.toLowerCase().split(' ');
            let search = this.props.search.toLowerCase();
            let split = search.split(' ')
            console.log('split ', split)
            console.log('title ', title)
            title.forEach((word) => {
              if (word === search){
                eventElements.push(
                  <div key={event.title}>
                    <a href={event.url} target="_blank"><h4>{event.title}</h4></a>
                    <p>Start: {event.start}</p>
                    <p>End: {event.end}</p>
                  </div>
                )
              }
            })
            for (let i = 0; i<title.length; i ++){
              if (title[i] === split[i]) {
                console.log('titleagain ', title)
                console.log('splitagain ', split)
                eventElements.push(
                  <div key={event.title}>
                    <a href={event.url} target="_blank"><h4>{event.title}</h4></a>
                    <p>Start: {event.start}</p>
                    <p>End: {event.end}</p>
                  </div>
                )
              }
            }
          }
        })
      } else {
        let byDate = _.sortBy(eventArr, ['stamp']);
        byDate.forEach((event) => {
          if (this.props.search === "") {
            eventElements.push(
              <div key={event.title}>
                <a href={event.url} target="_blank"><h4>{event.title}</h4></a>
                <p>Start: {event.start}</p>
                <p>End: {event.end}</p>
              </div>
            )
          } else {
            let title = event.title.toLowerCase().split(' ');
            let search = this.props.search.toLowerCase();
            let split = search.split(' ')
            console.log('split ', split)
            console.log('title ', title)
            title.forEach((word) => {
              if (word === search){
                eventElements.push(
                  <div key={event.title}>
                    <a href={event.url} target="_blank"><h4>{event.title}</h4></a>
                    <p>Start: {event.start}</p>
                    <p>End: {event.end}</p>
                  </div>
                )
              }
            })
            for (let i = 0; i<title.length; i ++){
              if (title[i] === split[i]) {
                console.log('titleagain ', title)
                console.log('splitagain ', split)
                eventElements.push(
                  <div key={event.title}>
                    <a href={event.url} target="_blank"><h4>{event.title}</h4></a>
                    <p>Start: {event.start}</p>
                    <p>End: {event.end}</p>
                  </div>
                )
              }
            }
          }
        })
      }
      return eventElements;
    };

  filter = () => {
    let setDate = this.props.sortByDate;
    let setTitle = this.props.sortByTitle;
    return(
      <div>
        <DropdownButton title="Filter by" id="bg-nested-dropdown">
          <MenuItem onClick={() => setDate()}>Date</MenuItem>
          <MenuItem onClick={() => setTitle()}>Title</MenuItem>
        </DropdownButton>
      </div>
    )
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
