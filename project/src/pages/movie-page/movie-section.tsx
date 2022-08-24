import { Link } from 'react-router-dom';
import Avatar from '../../components/avatar/avatar';
import ButtonMyList from '../../components/button-my-list/button-my-list';
import ButtonPlay from '../../components/button-play/button-play';
import Logo from '../../components/logo/logo';
import Tabs from '../../components/tabs/tabs';
import { AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getFilmsData } from '../../store/films-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function MovieSection():JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const {currentFilm} = useAppSelector(getFilmsData);
  const { name, backgroundImage, genre, released, posterImage, id} = currentFilm;
  return(
    <section className="film-card film-card--full">
      <div className="film-card__hero">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />
          <Avatar />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__desc">
            <h2 className="film-card__title">{name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{released}</span>
            </p>

            <div className="film-card__buttons">
              <ButtonPlay />
              <ButtonMyList />
              {(authorizationStatus === AuthStatus.Auth) && <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>}
            </div>
          </div>
        </div>
      </div>

      <div className="film-card__wrap film-card__translate-top">
        <div className="film-card__info">
          <div className="film-card__poster film-card__poster--big">
            <img src={posterImage} alt={name} width="218" height="327" />
          </div>
          <Tabs currentFilm={currentFilm}/>
        </div>
      </div>
    </section>
  );

}

export default MovieSection;
