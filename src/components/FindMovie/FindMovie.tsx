import React, { useState } from 'react';
import './FindMovie.scss';
import { Movie } from '../../types/Movie';
import { MovieCard } from '../MovieCard';

type Props = {
  findMovie: Movie | null;
  addMovie: (movies: Movie) => void;
  setQuery: (text: string) => void;
  setFindMovie: (movies: Movie | null) => void;
};

export const FindMovie: React.FC<Props> = ({
  findMovie,
  addMovie,
  setQuery,
  setFindMovie,
}) => {
  const [inputedText, setInputedText] = useState('');

  const isBtnFindDisabled = inputedText.trim() === '';

  return (
    <>
      <form className="find-movie">
        <div className="field">
          <label className="label" htmlFor="movie-title">
            Movie title
          </label>

          <div className="control">
            <input
              value={inputedText}
              data-cy="titleField"
              type="text"
              id="movie-title"
              placeholder="Enter a title to search"
              className="input is-danger"
              onChange={e => setInputedText(e.target.value)}
            />
          </div>

          <p className="help is-danger" data-cy="errorMessage">
            Can&apos;t find a movie with such a title
          </p>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              disabled={isBtnFindDisabled}
              data-cy="searchButton"
              type="submit"
              className="button is-light"
              onClick={e => {
                e.preventDefault();
                setQuery(inputedText);
              }}
            >
              Find a movie
            </button>
          </div>

          {findMovie && (
            <div className="control">
              <button
                data-cy="addButton"
                type="button"
                className="button is-primary"
                onClick={e => {
                  e.preventDefault();
                  addMovie(findMovie);
                  setInputedText('');
                  setFindMovie(null);
                }}
              >
                Add to the list
              </button>
            </div>
          )}
        </div>
      </form>

      <div className="container" data-cy="previewContainer">
        <h2 className="title">Preview</h2>
        {findMovie && <MovieCard movie={findMovie} />}
      </div>
    </>
  );
};
