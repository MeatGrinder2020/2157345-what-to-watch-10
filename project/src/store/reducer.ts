import { createReducer } from '@reduxjs/toolkit';
import { films } from '../mocks/films';
import { FilmData } from '../types/types';
import { filterFilmGenre, getFilms } from './action';

type InitialState = {
    films: FilmData[],
    filteredFilmsGenre: FilmData[]
}

const initialState = {
  films: films,
  filteredFilmsGenre: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(filterFilmGenre, (state: InitialState, action) => {
      const chosedGenre = action.payload;
      const allFilms = state.films;
      const filteredFilms: FilmData[] = allFilms.filter((film) => film.genre === chosedGenre);
      state.filteredFilmsGenre = chosedGenre === 'All genres' ? allFilms : filteredFilms;
    });
});

export {reducer};
