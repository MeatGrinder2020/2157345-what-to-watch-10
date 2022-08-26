import { SyntheticEvent, useEffect, useState } from 'react';
import { MAX_SYMBOLS_COMMENT, MIN_SYMBOLS_COMMENT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addCommentFilm } from '../../store/api-actions';
import { getCommentsData } from '../../store/comments-data/selectors';
import { getFilmsData } from '../../store/films-data/selectors';
import { AddReviewObj } from '../../types/types';
import FilmRating from '../film-rating/film-rating';

const initStateObj: AddReviewObj = {
  comment: '',
  rating: 0,
};

function AddReviewForm():JSX.Element {
  const dispatch = useAppDispatch();
  const { currentFilm } = useAppSelector(getFilmsData);
  const { isAddCommentsError } = useAppSelector(getCommentsData);
  const [formData, setFormData] = useState(initStateObj);
  const {comment, rating} = formData;
  const [isButtonPostDisabled, setIsButtonPostDisabled] = useState(true);
  const [isTextAreaDisabled, setIsTextAreaDisabled] = useState(false);
  const formChangeHandler = (event: SyntheticEvent): void => {
    // Код для обновления состояния объекта формы
    const {name, value} = event.target as HTMLTextAreaElement;
    setFormData({...formData, [name]: value});
  };

  const onSubmitHandler = (event: SyntheticEvent):void => {
    event.preventDefault();
    const rewiew = {
      id: currentFilm.id,
      comment: comment.slice(0, MAX_SYMBOLS_COMMENT),
      rating,
    };
    dispatch(addCommentFilm(rewiew));
    setIsTextAreaDisabled(true);
    setIsButtonPostDisabled(true);
  };

  useEffect(()=>{
    if (comment.length > MIN_SYMBOLS_COMMENT && rating !== 0) {
      setIsButtonPostDisabled(false);
    } else {
      setIsButtonPostDisabled(true);
    }
  },[comment, rating]);
  useEffect(()=>{
    if (isAddCommentsError) {
      setIsButtonPostDisabled(false);
      setIsTextAreaDisabled(false);
    }
  },[isAddCommentsError]);
  return(
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={onSubmitHandler}>
        <FilmRating changeFormRating={formChangeHandler} formData={formData}></FilmRating>
        <div className="add-review__text">
          <textarea className="add-review__textarea" name="comment" id="review-text" placeholder="Review text" onChange={formChangeHandler} disabled={isTextAreaDisabled}></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={isButtonPostDisabled}>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
