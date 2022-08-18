import React from 'react';
import FilmComment from '../../components/film-comment/film-comment';
import { useAppSelector } from '../../hooks';
import { getCommentsData } from '../../store/comments-data/selectors';

function MovieReviews (): JSX.Element {
  const {currentFilmComments} = useAppSelector(getCommentsData);
  return(
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {currentFilmComments.map((comment) => <FilmComment key={comment.id} commentary={comment}/>)}
      </div>
      <div className="film-card__reviews-col">

      </div>
    </div>
  );
}
export default MovieReviews;
