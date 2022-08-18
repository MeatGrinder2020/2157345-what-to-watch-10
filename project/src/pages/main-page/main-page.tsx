import React, { useState } from 'react';
import Avatar from '../../components/avatar/avatar';
import GenresList from '../../components/genres-list/genres-list';
import ListFilms from '../../components/list-films/list-films';
import ShowMore from '../../components/show-more/show-more';
import { HOW_MATCH_SHOW_FILMS } from '../../const';
import { useAppSelector } from '../../hooks';
import { getFilmsData } from '../../store/films-data/selectors';

function MainPage(): JSX.Element {
  const {films, filteredFilmsGenre, promoFilm} = useAppSelector(getFilmsData);
  const genresFilms = ['All genres', ...new Set(films.map((film)=>film.genre))];
  const [incForShow, setIncForShow] = useState(HOW_MATCH_SHOW_FILMS);
  const filmsForShow = filteredFilmsGenre.slice(0, incForShow);
  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link" href="/">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <Avatar />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList genresFilms={genresFilms}></GenresList>
          <ListFilms films={filmsForShow} />
          {(incForShow <= filmsForShow.length) && <ShowMore incForShow={incForShow} showMoreFilms={setIncForShow}/>}
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light" href="/">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default MainPage;
