import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';

import {
  StyledSearchBar,
  StyledSearchBarContent,
} from '../styles/StyledSearchBar';

class SearchBar extends Component {
  state = {inputValue: ''};
  timeOut = null;

  doSearch = event => {
    const {value} = event.target;
    const {callback} = this.props;

    this.setState({ inputValue: value});
    clearTimeout(this.timeOut);

    this.timeOut = setTimeout(() => {
      const {inputValue} = this.state;
      callback(inputValue);
    }, 500);
  };

  render() {
    const {inputValue} = this.state;
    return (
      <StyledSearchBar>
        <StyledSearchBarContent>
          <FontAwesome className="fa-search" name="search" size="2x" />
          <input
            type="text"
            placeholder="Search Movie"
            onChange={this.doSearch}
            value={inputValue}
          />
        </StyledSearchBarContent>
      </StyledSearchBar>
    );
  }
}

export default SearchBar;

// Concepts
// Controlled component -instead of using the built in state of the html input we set expicitly the value
// The state value and the input value are always going to be in sync and we do this manually.
// useRef hook

// In this case when a user types in the input he triggers the function doSearch
// which updates the state, which updates the value of the input.
