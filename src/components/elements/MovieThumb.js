import React from 'react'

import {StyledMovieThumb} from '../styles/StyledMovieThumb';
import { Link } from '@reach/router';

const MovieThumb = ({clickable, image, movieId}) => (
  <StyledMovieThumb>
    {clickable ? (
      <Link to={`/${movieId}`}>
        <img className="clickable" src={image} alt="moviethumb" />
      </Link>
    ) : (
      <img src={image} alt="moviethumb" />
    )}
  </StyledMovieThumb>
);

export default MovieThumb;
