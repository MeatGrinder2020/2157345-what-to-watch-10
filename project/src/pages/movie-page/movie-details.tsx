import React from 'react';
import { MovieTabsProps } from '../../types/types';

const getDurationFilm = (runTime: number) => {
  const hours = Math.floor(runTime / 60);
  const minutes = runTime - hours * 60;
  return `${hours}h ${minutes}m`;
};

function MovieDetails ({currentFilm}:MovieTabsProps): JSX.Element{
  const {director, starring, genre, released, runTime} = currentFilm;
  return(
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {starring.map((name,i)=>(<div key={name}>{`${name}${i === starring.length - 1 ? '' : ',' }`}</div>))}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{getDurationFilm(runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
}
export default MovieDetails;
