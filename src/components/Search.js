import React, { Component } from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';
import _ from 'lodash';

class Search extends Component {
  constructor(props){
    super(props);

    this.input = this.input.bind(this);
    this.enter = this.enter.bind(this)

  };

  enter(e){
    if (e.charCode === 13) {
      e.preventDefault();
    };
  }

  input(){
    return (
      <div>
        <form>
        <FormGroup controlId="formBasicText">
          <FormControl
            type="text"
            defaultValue={this.props.search}
            placeholder="Enter text"
            onChange={(e) => this.props.handleChange(e)}
            onKeyDown={(e) => this.enter(e)}
            />
          </FormGroup>
        </form>
      </div>
    )
  };

  render() {
    return(
      <div>
        {this.input()}
      </div>
    )
  }
};

export default Search;
