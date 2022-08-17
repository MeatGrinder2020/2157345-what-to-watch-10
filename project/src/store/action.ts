import {createAction} from '@reduxjs/toolkit';
import { AppPagesRoute } from '../const';

export const filterFilmGenre = createAction('films/filterFilmGenre', (value) => ({
  payload: value,
}));

export const redirectToRoute = createAction<AppPagesRoute | string>('route/redirectToRoute');

