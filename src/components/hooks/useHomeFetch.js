import { useState, useEffect } from 'react';
import { POPULAR_BASE_URL } from '../../config';

export const useHomeFetch = (searchTerm) => {
  const [state, setState] = useState({movies: []});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // async says this is an async function
  const fetchMovies = async endpoint => {
    setError(false);
    setLoading(false);

    const isLoadMore = endpoint.search('page') !== -1;

    try {
      // wait for the call to finish two times
      // First when we fetch the data
      // Second when we parse the response (.json is async)
      const result = await (await fetch(endpoint)).json();
      setState(prev => {
        const moviesWithDuplicates =
          isLoadMore ?
          [...prev.movies, ...result.results]:
          [...result.results];

        const movies = moviesWithDuplicates.reduce((unique, item) => {
          if (unique.find(movie => movie.id === item.id)) {
            return unique;
          } else {
            return [...unique, item];
          }
        }, []);

        return {
        ...prev,
        movies: Object.values(movies),
        heroImage: prev.heroImage || result.results[0], // Take the first movie and use it as cover
        currentPage: result.page,
        totalPages: result.total_pages,
      }
    });
    } catch(error) {
      setError(true);
      console.log(error);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (sessionStorage.homeState) {
      setState(JSON.parse(sessionStorage.homeState));
      setLoading(false);
    } else {
      fetchMovies(POPULAR_BASE_URL);
    }
  }, [])

  useEffect(() => {
    if (!searchTerm) {
      sessionStorage.setItem('homeState', JSON.stringify(state));
    }
  }, [searchTerm, state])

  return [{state, loading, error}, fetchMovies];
};
