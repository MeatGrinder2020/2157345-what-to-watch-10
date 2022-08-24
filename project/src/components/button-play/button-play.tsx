import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getFilmsData } from '../../store/films-data/selectors';
type ButtonPlayProps = {
    isPromo?: boolean
}

function ButtonPlay({isPromo = false}:ButtonPlayProps):JSX.Element {
  const {promoFilm, currentFilm} = useAppSelector(getFilmsData);
  const navigate = useNavigate();
  const onClickPlayHandler = () => {
    navigate(`/player/${isPromo ? promoFilm.id : currentFilm.id}`);
  };
  return (
    <button className="btn btn--play film-card__button" type="button" onClick={onClickPlayHandler}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
}

export default ButtonPlay;
