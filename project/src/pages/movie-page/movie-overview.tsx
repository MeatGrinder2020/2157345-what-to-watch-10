import React from 'react';
import { RATING } from '../../const';
import { MovieTabsProps } from '../../types/types';

const getRatingLevel = (rating: number) => {
  const {bad, normal, good, veryGood, awesome} = RATING;
  if (rating >= bad.min && rating < bad.max){
    return 'Bad';
  }
  if (rating >= normal.min && rating < normal.max){
    return 'Normal';
  }
  if (rating >= good.min && rating < good.max){
    return 'Good';
  }
  if (rating >= veryGood.min && rating < veryGood.max){
    return 'Very good';
  }
  if (rating >= awesome.min){
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
