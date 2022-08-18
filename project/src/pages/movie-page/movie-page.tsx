import React, { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Loader from '../../components/loader/loader';
import MoreLikeThis from '../../components/more-like-this/more-like-this';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCommentsFilm, fetchFilmData, fetchLikeThisFilms } from '../../store/api-actions';
import { getFilmsData } from '../../store/films-data/selectors';
import MovieSection from './movie-section';

function MoviePage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(fetchFilmData(Number(id)));
    dispatch(fetchCommentsFilm(Number(id)));
    dispatch(fetchLikeThisFilms(Number(id)));
  },[id, dispatch]);

  const {isDataCurrentFilmLoading, isDataLikeThisFilmLoading} = useAppSelector(getFilmsData);

  if (isDataCurrentFilmLoading || isDataLikeThisFilmLoading) { return <Loader />;}

  return(
    <React.Fragment>
      <MovieSection />
      <div className="page-content">
        <MoreLikeThis />
        <Footer/>
      </div>
    </React.Fragment>
  );
}
export default memo(MoviePage);
