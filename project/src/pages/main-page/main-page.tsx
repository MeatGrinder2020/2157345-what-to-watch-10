import React, { memo, useState } from 'react';
import Avatar from '../../components/avatar/avatar';
import ButtonMyList from '../../components/button-my-list/button-my-list';
import ButtonPlay from '../../components/button-play/button-play';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres-list/genres-list';
import ListFilms from '../../components/list-films/list-films';
import Logo from '../../components/logo/logo';
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
          <Logo />
          <Avatar />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={promoFilm.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <ButtonPlay isPromo/>
                <ButtonMyList isPromo/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList genresFilms={genresFilms} setIncForShow={setIncForShow}></GenresList>
          <ListFilms films={filmsForShow} />
          {(incForShow <= filmsForShow.length) && <ShowMore incForShow={incForShow} showMoreFilms={setIncForShow}/>}
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default memo(MainPage);
