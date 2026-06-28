import { Movie } from './types/Movie';
import { MovieData } from './types/MovieData';
import { ResponseError } from './types/ReponseError';

const API_URL = 'https://www.omdbapi.com/?apikey=cb2f87';

export async function getMovie(query: string): Promise<Movie> {
  const response = await fetch(`${API_URL}&t=${query}`);

  if (!response.ok) {
    throw new Error('unexpected error');
  }

  const dataMovie: MovieData | ResponseError = await response.json();

  if ('Error' in dataMovie) {
    throw new Error(dataMovie.Error || 'Movie not found!');
  }

  return {
    title: dataMovie.Title,
    description: dataMovie.Plot,
    imgUrl:
      dataMovie.Poster && dataMovie.Poster !== 'N/A'
        ? dataMovie.Poster
        : 'https://via.placeholder.com/360x270.png?text=no%20preview',
    imdbUrl: `https://www.imdb.com/title/${dataMovie.imdbID}`,
    imdbId: dataMovie.imdbID,
  };
}
