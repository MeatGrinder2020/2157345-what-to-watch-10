import React from 'react';
import { MovieTabsProps } from '../../types/types';

const getRatingLevel = (rating: number) => {
  if (rating >= 0 && rating < 3){
    return 'Bad';
  }
  if (rating >= 3 && rating < 5){
    return 'Normal';
  }
  if (rating >= 5 && rating < 8){
    return 'Good';
  }
  if (rating >= 8 && rating < 10){
    return 'Very good';
  }
  if (rating >= 10){
    return 'Awesome';
  }
};

function MovieOverview ({currentFilm}:MovieTabsProps): JSX.Element {
  const {rating, scoresCount, description, director, starring} = currentFilm;
  return(
    <React.Fragment>

      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingLevel(rating)}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>
        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring.join(',')}</strong></p>
      </div>


    </React.Fragment>
  );
}
export default MovieOverview;
