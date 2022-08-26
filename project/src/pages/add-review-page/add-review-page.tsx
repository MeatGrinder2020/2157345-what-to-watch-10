import React,{useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import Avatar from '../../components/avatar/avatar';
import Logo from '../../components/logo/logo';
import { AppPagesRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmData } from '../../store/api-actions';
import { getFilmsData } from '../../store/films-data/selectors';

function AddReviewPage (): JSX.Element {
  const {currentFilm} = useAppSelector(getFilmsData);
  const {name, backgroundImage, posterImage} = currentFilm;
  const {id} = useParams();
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(fetchFilmData(Number(id)));
  },[id, dispatch]);
  return(
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppPagesRoute.ReturnFilmPage}/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={`${AppPagesRoute.ReturnFilmPage}/${id}/review`}>Add review</Link>
              </li>
            </ul>
          </nav>

          <Avatar />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>
      </div>

      <AddReviewForm />
    </section>
  );
}
export default AddReviewPage;
