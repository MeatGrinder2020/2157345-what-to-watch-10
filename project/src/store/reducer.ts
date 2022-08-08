import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus } from '../const';
import { Films } from '../types/types';
import { filterFilmGenre, loadFilms, requireAuth, setDataLoadedStatus } from './action';

type InitialState = {
    films: Films,
    filteredFilmsGenre: Films,
    isDataLoading: boolean,
    authorizationStatus: AuthStatus
}

const initialState: InitialState = {
  films: [],
  filteredFilmsGenre: [],
  isDataLoading: false,
  authorizationStatus: AuthStatus.Unknown,
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
    });
});

export {reducer};
