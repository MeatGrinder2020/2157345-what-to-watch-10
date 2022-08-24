import React from 'react';
import Avatar from '../../components/avatar/avatar';
import Footer from '../../components/footer/footer';
import ListFilms from '../../components/list-films/list-films';
import Logo from '../../components/logo/logo';
import { useAppSelector } from '../../hooks';
import { getFavoriteFilmsData } from '../../store/favorite-films/selectors';

function MyListPage (): JSX.Element {
  const {favoriteFilmsList} = useAppSelector(getFavoriteFilmsData);
  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilmsList.length}</span></h1>
        <Avatar />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <ListFilms films={favoriteFilmsList} />
      </section>

      <Footer />
    </div>
  );
}
export default MyListPage;
