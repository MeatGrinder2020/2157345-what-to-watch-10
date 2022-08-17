import { SyntheticEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addCommentFilm } from '../../store/api-actions';
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
  const [formData, setFormData] = useState(initStateObj);
  const formChangeHandler = (event: SyntheticEvent): void => {
    // Код для обновления состояния объекта формы
    const {name, value} = event.target as HTMLTextAreaElement;
    setFormData({...formData, [name]: value});
  };

  const onSubmitHandler = (event: SyntheticEvent):void => {
    event.preventDefault();
    const {comment, rating} = formData;
    const rewiew = {
      id: currentFilm.id,
      comment,
      rating,
    };
    dispatch(addCommentFilm(rewiew));
  };

  return(
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={onSubmitHandler}>
        <FilmRating changeFormRating={formChangeHandler} formData={formData}></FilmRating>
        <div className="add-review__text">
          <textarea className="add-review__textarea" name="comment" id="review-text" placeholder="Review text" onChange={formChangeHandler}></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
