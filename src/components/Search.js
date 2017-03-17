import React, { Component } from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';
import _ from 'lodash';

class Search extends Component {
  constructor(props){
    super(props);

    this.input = this.input.bind(this);
    this.enter = this.enter.bind(this)

  };

//prevents page refresh if user hits enter
  enter(e){
    if (e.charCode === 13) {
      e.preventDefault();
    };
  }

//creates the search bar, onChange for input, onKeyPress to prevent enter
  input(){
    return (
      <div>
        <form>
        <FormGroup controlId="formBasicText">
          <FormControl
            type="text"
            defaultValue={this.props.search}
            placeholder="Search for an event"
            onChange={(e) => this.props.handleChange(e)}
            onKeyPress={(e) => this.enter(e)}
            />
          </FormGroup>
        </form>
      </div>
    )
  };

  render() {
    return(
      <div className="search-bar">
        {this.input()}
      </div>
    )
  }
};

export default Search;
