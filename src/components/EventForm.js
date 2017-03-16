import React, { Component } from 'react';
import {Form, Col, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import moment from 'moment';
// import _ from 'lodash';

class EventForm extends Component {
  constructor(props){
    super(props);

    this.form = this.form.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.validateTitle = this.validateTitle.bind(this);
    this.submitEvent = this.submitEvent.bind(this);

  };

  preventEnter = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
    };
  }

  validateTitle(){
    if (this.props.newTitle !== "") return 'success';
  }

  getValidationState() {
    const start = this.props.newStart + 'T' + this.props.newStartTime;
    const end = this.props.newEnd + 'T' + this.props.newEndTime;
    if (moment(start).isBefore(end)) {
      return 'success';
    }
    else if (moment(end).isBefore(start)) return 'warning';
  };

  form() {
    return (
      <Form horizontal>
        <FormGroup
          controlId="formHorizontalTitle"
          validationState={this.validateTitle()}
        >
        <Col componentClass={ControlLabel} sm={2}>
          Event Title:
        </Col>
        <Col sm={10}>
        <FormControl
            type="text"
            defaultValue={this.props.newTitle}
            placeholder="Enter new event title"
            onChange={this.props.handleFormTitle}
            onKeyPress={(e) => this.preventEnter(e)}
          />
        <FormControl.Feedback />
        </Col>
        </FormGroup>
        <FormGroup
          controlId="formHorizontalDates"
          validationState={this.getValidationState()}
        >
          <Col componentClass={ControlLabel} sm={2}>
            Start Date:
          </Col>
          <Col sm={10}>
            <FormControl
              type="date"
              defaultValue={this.props.newStart}
              onChange={this.props.handleStartDate}
              onKeyPress={(e) => this.preventEnter(e)}
            />
            <FormControl.Feedback />
          </Col>

          <Col componentClass={ControlLabel} sm={2}>
            Start Time:
          </Col>
          <Col sm={10}>
            <FormControl
              type="time"
              defaultValue={this.props.newStartTime}
              placeholder="Enter the start date"
              onChange={this.props.handleStartTime}
              onKeyPress={(e) => this.preventEnter(e)}
            />
            <FormControl.Feedback />
          </Col>

          <Col componentClass={ControlLabel} sm={2}>
            End Date:
          </Col>
          <Col sm={10}>
            <FormControl
              type="date"
              defaultValue={this.props.newEnd}
              onChange={this.props.handleEndDate}
              onKeyPress={(e) => this.preventEnter(e)}
            />
            <FormControl.Feedback />
          </Col>

          <Col componentClass={ControlLabel} sm={2}>
            End Time:
          </Col>
          <Col sm={10}>
            <FormControl
              type="time"
              defaultValue={this.props.newEndTime}
              onChange={this.props.handleEndTime}
              onKeyPress={(e) => this.preventEnter(e)}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

      </Form>
    );
  };

  submitButton = () => {
      return ( <Button onClick={() => this.submitEvent()}>Submit</Button> )
  }

  submitEvent(){
    if (this.getValidationState() === 'success') {
      this.props.submitEvent();
    };
  }

  render() {
    return(
      <div>
        {this.form()}
          {this.getValidationState() === 'success'
            ?
            this.submitButton()
            :
            <p>Make sure your dates are correct.</p>
          }
      </div>
    )
  }
};

export default EventForm;
