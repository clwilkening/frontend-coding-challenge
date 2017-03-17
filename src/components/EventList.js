import React, { Component } from 'react';
import {DropdownButton, MenuItem, Button, Row, Col} from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';

class EventList extends Component {
  constructor(props){
    super(props);

    this.renderEvents = this.renderEvents.bind(this);
  }

  renderEvents() {
    let events = this.props.events;
    console.log('events ', events)
    let { byTitle } = this.props;
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
              <Col className="event" key={event.title}>
                <h4><a href={event.url} target="_blank">{event.title}</a></h4>
                <span>Start:</span> <p>{event.start}</p>
                <span>End:</span> <p>{event.end}</p>
              </Col>
            )
          } else {
            let title = event.title.toLowerCase().split(' ');
            let search = this.props.search.toLowerCase();
            let split = search.split(' ')
            title.forEach((word) => {
              if (word === search){
                eventElements.push(
                  <Col className="event" key={event.title}>
                    <h4><a href={event.url} target="_blank">{event.title}</a></h4>
                    <span>Start:</span> <p>{event.start}</p>
                    <span>End:</span> <p>{event.end}</p>
                  </Col>
                )
              }
            })
            for (let i = 0; i<title.length; i ++){
              if (title[i] === split[i]) {
                eventElements.push(
                  <Col className="event" key={event.title}>
                    <h4><a href={event.url} target="_blank">{event.title}</a></h4>
                    <span>Start:</span> <p>{event.start}</p>
                    <span>End:</span> <p>{event.end}</p>
                  </Col>
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
              <Col className="event" key={event.title}>
                <h4><a href={event.url} target="_blank">{event.title}</a></h4>
                <span>Start:</span> <p>{event.start}</p>
                <span>End:</span> <p>{event.end}</p>
              </Col>
            )
          } else {
            let title = event.title.toLowerCase().split(' ');
            let search = this.props.search.toLowerCase();
            let split = search.split(' ')
            title.forEach((word) => {
              if (word === search){
                eventElements.push(
                  <Col className="event" key={event.title}>
                    <h4><a href={event.url} target="_blank">{event.title}</a></h4>
                    <span>Start:</span> <p>{event.start}</p>
                    <span>End:</span> <p>{event.end}</p>
                  </Col>
                )
              }
            })
            for (let i = 0; i<title.length; i ++){
              if (title[i] === split[i]) {
                eventElements.push(
                  <Col className="event" key={event.title}>
                    <h4><a href={event.url} target="_blank">{event.title}</a></h4>
                    <span>Start:</span> <p>{event.start}</p>
                    <span>End:</span> <p>{event.end}</p>
                  </Col>
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
    let showForm = this.props.showForm;
    return(
      <Row>
      <Col xs={2}>
        <DropdownButton title="Filter by" id="bg-nested-dropdown">
          <MenuItem onClick={() => setDate()}>Date</MenuItem>
          <MenuItem onClick={() => setTitle()}>Title</MenuItem>
        </DropdownButton>
      </Col>
      <Col xs={2} xsOffset={1} className="filter-by">
        {this.props.byTitle === false ?
        <p>Date</p>
        :
        <p>Title</p>
        }
      </Col>
      <Col xs={3} xsOffset={4}>
        <Button onClick={() => showForm()}>Add Event</Button>
      </Col>
      </Row>
    )
  }

  render() {
    return(
      <Row>
      <Col xs={12} sm={8} smOffset={2}>
        {this.filter()}
        {this.renderEvents()}
      </Col>
      </Row>
    )
  }
};

export default EventList;
