import React, {useState, useRef} from 'react';
import FontAwesome from 'react-fontawesome';

import {
  StyledSearchBar,
  StyledSearchBarContent,
} from '../styles/StyledSearchBar';

const SearchBar = ({callback}) => {
  const [state, setState] = useState('');
  const timeOut = useRef(null);

  const doSearch = event => {
    const { value } = event.target;

    clearTimeout(timeOut.current);
    setState(value);

    timeOut.current = setTimeout(() => {
      callback(value);
    }, 500);
  };

  return (
    <StyledSearchBar>
      <StyledSearchBarContent>
        <FontAwesome className="fa-search" name="search" size="2x" />
        <input
          type="text"
          placeholder="Search Movie"
          onChange={doSearch}
          value={state}
        />
      </StyledSearchBarContent>
    </StyledSearchBar>
  );
};

export default SearchBar;

// Concepts
// Controlled component -instead of using the built in state of the html input we set expicitly the value
// The state value and the input value are always going to be in sync and we do this manually.
// useRef hook

// In this case when a user types in the input he triggers the function doSearch
// which updates the state, which updates the value of the input.
