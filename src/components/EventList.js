import React, { Component } from 'react';
import {DropdownButton, MenuItem, Button, Row, Col, PanelGroup, Panel} from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';

class EventList extends Component {
  constructor(props){
    super(props);

    this.renderEvents = this.renderEvents.bind(this);
  }

//will render the events from the api call
  renderEvents() {
    let events = this.props.events;
    let { byTitle } = this.props;
    //eventElements are the elements that will be rendered to DOM
    let eventElements = [];
    //eventArr is an array of data for each event
    let eventArr = [];
    //loop through each event to get data for eventArr
      events.forEach((event) => {
        let start = moment(event.start_time).format('LLL');
        let end = moment(event.end_time).format('LLL')
        let timestamp = moment(event.start_time).format('x')
        eventArr.push({'title': event.title, 'start': start, 'end': end, 'url': event.url, 'stamp': timestamp, 'desc': event.description});
      });
      //if searching by title state is true, this will run
      if (byTitle === true) {
        //sort the information by title ascending
        let byTitle = _.sortBy(eventArr, ['title']);
        //loop through to great DOM elements, only if the search bar is empty
        byTitle.forEach((event) => {
          if (this.props.search === "") {
            eventElements.push(
              <Col className="event" key={event.title}>
                <h4><a href={event.url} target="_blank">{event.title}</a></h4>
                <PanelGroup defaultActiveKey="2" accordion>
                  <Panel header="Event Info" eventKey="1"><p>{event.desc}</p></Panel>
                </PanelGroup>
                <span>Start:</span> <p>{event.start}</p>
                <span>End:</span> <p>{event.end}</p>
              </Col>
            )
          } else {
            //if currently searching this code will run
            let title = event.title.toLowerCase().split(' '); //set the title to lowercase, seperate words into array
            let search = this.props.search.toLowerCase(); //current search input as lowercase
            let split = search.split(' ') //split the search input into array
            title.forEach((word) => {
              //if the word in title array matches the entire search input this will run
              if (word === search){
                eventElements.push(
                  <Col className="event" key={event.title}>
                    <h4><a href={event.url} target="_blank">{event.title}</a></h4>
                    <PanelGroup defaultActiveKey="2" accordion>
                      <Panel header="Event Info" eventKey="1"><p>{event.desc}</p></Panel>
                    </PanelGroup>
                    <span>Start:</span> <p>{event.start}</p>
                    <span>End:</span> <p>{event.end}</p>
                  </Col>
                )
              };
            })
            for (let i = 0; i<title.length; i ++){
              //if the word in title array matches a word in split/search array
              if (title[i] === split[i]) {
                eventElements.push(
                  <Col className="event" key={event.title}>
                    <h4><a href={event.url} target="_blank">{event.title}</a></h4>
                    <PanelGroup defaultActiveKey="2" accordion>
                      <Panel header="Event Info" eventKey="1"><p>{event.desc}</p></Panel>
                    </PanelGroup>
                    <span>Start:</span> <p>{event.start}</p>
                    <span>End:</span> <p>{event.end}</p>
                  </Col>
                )
              };
            };
          };
        });
      } else {
        //code does the same funcationality as above, but when filtering by date.
        let byDate = _.sortBy(eventArr, ['stamp']);
        byDate.forEach((event) => {
          if (this.props.search === "") {
            eventElements.push(
              <Col className="event" key={event.title}>
                <h4><a href={event.url} target="_blank">{event.title}</a></h4>
                <PanelGroup defaultActiveKey="2" accordion>
                  <Panel header="Event Info" eventKey="1"><p>{event.desc}</p></Panel>
                </PanelGroup>
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
                    <PanelGroup defaultActiveKey="2" accordion>
                      <Panel header="Event Info" eventKey="1"><p>{event.desc}</p></Panel>
                    </PanelGroup>
                    <span>Start:</span> <p>{event.start}</p>
                    <span>End:</span> <p>{event.end}</p>
                  </Col>
                )
              };
            })
            for (let i = 0; i<title.length; i ++){
              if (title[i] === split[i]) {
                eventElements.push(
                  <Col className="event" key={event.title}>
                    <h4><a href={event.url} target="_blank">{event.title}</a></h4>
                    <PanelGroup defaultActiveKey="2" accordion>
                      <Panel header="Event Info" eventKey="1"><p>{event.desc}</p></Panel>
                    </PanelGroup>
                    <span>Start:</span> <p>{event.start}</p>
                    <span>End:</span> <p>{event.end}</p>
                  </Col>
                )
              };
            };
          };
        });
      };
      return eventElements;
    };

  filter = () => {
    //create the filter button
    const setDate = this.props.sortByDate;    //function for sorting by date
    const setTitle = this.props.sortByTitle;  //function for sorting by title
    const showForm = this.props.showForm;     //function for viewing the event form
    //renders the filter button, currently filtering by, and add event button
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
