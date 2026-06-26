import { useEffect, useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { FindMovie } from './components/FindMovie';
import { Movie } from './types/Movie';
import { getMovie } from './api';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [findMovie, setFindMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState<string>('');
  const [, setIsLoading] = useState(false);// !!!!!!! 
  const [, setError] = useState<string | null>(null);// !!!!!!! 

  useEffect(() => {
    if (!query) {
      return;
    }

    let isCurrent = true;

    setIsLoading(true);
    setError(null);

    getMovie(query)
      .then(data => {
        if (isCurrent) {
          setFindMovie(data);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setError('Произошла ошибка');
          setFindMovie(null);
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [query, findMovie, movies]);

  // helper for added the movie to Array movies
  const handleAddMovie = (newMovie: Movie) => {
    setMovies(prevMovies => [...prevMovies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>

      <div className="sidebar">
        <FindMovie
          findMovie={findMovie}
          setFindMovie={setFindMovie}
          addMovie={handleAddMovie}
          setQuery={setQuery}
        />
      </div>
    </div>
  );
};
