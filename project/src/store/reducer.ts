import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus, INIT_FILM } from '../const';
import { Films, FilmData, Comments } from '../types/types';
import { filterFilmGenre, getCommentsFilm, getFilmData, getLikeThisFilm, getPromoFilm, loadFilms, requireAuth, setDataLoadedStatus } from './action';

type InitialState = {
    films: Films,
    filteredFilmsGenre: Films,
    isDataLoading: boolean,
    authorizationStatus: AuthStatus,
    currentFilm: FilmData,
    likeThisFilms: Films,
    promoFilm: FilmData,
    currentFilmComments: Comments

}

const initialState: InitialState = {
  films: [],
  filteredFilmsGenre: [],
  isDataLoading: false,
  authorizationStatus: AuthStatus.Unknown,
  currentFilm: INIT_FILM,
  likeThisFilms: [],
  promoFilm: INIT_FILM,
  currentFilmComments: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(filterFilmGenre, (state, action) => {
      const chosedGenre = action.payload;
      const allFilms = state.films;
      const filteredFilms: Films = allFilms.filter((film) => film.genre === chosedGenre);
      state.filteredFilmsGenre = chosedGenre === 'All genres' ? allFilms : filteredFilms;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(requireAuth, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(getFilmData, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(getLikeThisFilm, (state, action) => {
      state.likeThisFilms = action.payload;
    })
    .addCase(getPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(getCommentsFilm, (state, action) => {
      state.currentFilmComments = action.payload;
    });
});

export {reducer};
