import {createAction} from '@reduxjs/toolkit';
import { Films } from '../types/types';

export const loadFilms = createAction<Films>('data/loadFilms');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const filterFilmGenre = createAction('main/filterFilmGenre', (value) => ({
  payload: value,
}));

