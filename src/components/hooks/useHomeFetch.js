import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../../config';

export const useHomeFetch = () => {
  const [state, setState] = useState({movies: []});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // async says this is an async function
  const fetchMovies = async endpoint => {
    setError(false);
    setLoading(false);

    const isLoadMore = endpoint.search('page');

    try {
      // wait for the call to finish two times
      // First when we fetch the data
      // Second when we parse the response (.json is async)
      const result = await (await fetch(endpoint)).json();
      setState(prev => ({
        ...prev,
        movies: isLoadMore ? [...prev.movies, ...result.results] : [...result.results],
        heroImage: prev.heroImage || result.results[0], // Take the first movie and use it as cover
        currentPage: result.page,
        totalPages: result.total_pages,
      }))
    } catch(error) {
      setError(true);
      console.log(error);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}`);
  }, [])

  return [{state, loading, error}, fetchMovies];
};
