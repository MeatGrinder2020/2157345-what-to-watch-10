import {createAction} from '@reduxjs/toolkit';

export const getFilms = createAction('main/getFilms', (value) => ({
  payload: value,
}));

export const filterFilmGenre = createAction('main/filterFilmGenre', (value) => ({
  payload: value,
}));

