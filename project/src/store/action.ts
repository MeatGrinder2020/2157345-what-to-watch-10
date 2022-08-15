import {createAction} from '@reduxjs/toolkit';
import { AppPagesRoute, AuthStatus } from '../const';
import { AnswerSendComments, Comments, FilmData, Films } from '../types/types';

export const loadFilms = createAction<Films>('data/loadFilms');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const filterFilmGenre = createAction('films/filterFilmGenre', (value) => ({
  payload: value,
}));

export const requireAuth = createAction<AuthStatus>('user/requireAuth');

export const redirectToRoute = createAction<AppPagesRoute | string>('route/redirectToRoute');

export const getFilmData = createAction<FilmData>('films/getFilmData');

export const getLikeThisFilm = createAction<Films>('films/getLikeThisFilm');

export const getPromoFilm = createAction<FilmData>('films/getPromoFilm');

export const getCommentsFilm = createAction<Comments>('comments/getCommentsFilm');

export const setCommentsFilm = createAction<AnswerSendComments>('comments/setCommentsFilm');
