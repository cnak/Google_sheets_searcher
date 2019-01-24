import React, { Component } from 'react';
import './SearchBox.scss';
import axios from 'axios';
import ResultList from '../ResultsList';

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { listResults: [] };
    this.keyPress = this.keyPress.bind(this);
  }

  keyPress(e) {
    const ENTER_KEY = 13;
    if (e.keyCode === ENTER_KEY) {
      axios
        .get(`http://localhost:3001/projects/${e.target.value}`)
        .then(res => {
          const listResults = res.data.projects;
          this.setState({ listResults });
        });
    }
  }

  render() {
    const { listResults } = this.state;
    return (
      <div>
        <input
          type="text"
          className="input"
          placeholder="Search"
          onKeyDown={this.keyPress}
        />
        <ResultList projects={listResults} />
      </div>
    );
  }
}
