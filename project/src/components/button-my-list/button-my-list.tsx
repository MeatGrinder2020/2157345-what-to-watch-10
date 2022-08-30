import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppPagesRoute, AuthStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeMyListFilm } from '../../store/api-actions';
import { getFavoriteFilmsData } from '../../store/favorite-films/selectors';
import { getFilmsData } from '../../store/films-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import CheckMark from '../check-mark/check-mark';

type ButtonMyListProps = {
  isPromo?: boolean,
}

function ButtonMyList({isPromo = false}:ButtonMyListProps):JSX.Element {
  const navigate = useNavigate();
  const {favoriteFilmsList} = useAppSelector(getFavoriteFilmsData);
  const {currentFilm, promoFilm} = useAppSelector(getFilmsData);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const countFilmsInMyList = favoriteFilmsList.length;
  const film = isPromo ? promoFilm : currentFilm;
  const isFilmInMyList = favoriteFilmsList.filter((favFilm) => favFilm.id === film.id)[0];
  const dispatch = useAppDispatch();
  const [statusFilm, setStatusFilm] = useState(isFilmInMyList ? 1 : 0);
  const handleOnClickMyList = () => {
    if (authorizationStatus === AuthStatus.Auth) {
      dispatch(changeMyListFilm({
        id: isPromo ? promoFilm.id : currentFilm.id,
        status: statusFilm === 1 ? 0 : 1
      }));
      setStatusFilm(statusFilm === 1 ? 0 : 1);
    } else {
      navigate(`${AppPagesRoute.SignIn}`);
    }
  };
  useEffect(()=>{
    if (isFilmInMyList === undefined) {
      setStatusFilm(0);
    }
  }, [isFilmInMyList]);
  return(
    <button className="btn btn--list film-card__button" type="button" onClick={handleOnClickMyList}>
      {statusFilm ? <CheckMark /> : <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use></svg>}
      <span>My list</span>
      <span className="film-card__count">{countFilmsInMyList}</span>
    </button>
  );
}

export default ButtonMyList;
