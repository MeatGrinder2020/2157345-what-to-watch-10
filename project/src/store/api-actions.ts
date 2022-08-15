import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppPagesRoute, AuthStatus } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { AppDispatch, State } from '../types/state';
import { AnswerSendComments, CommentAdd, Comments, FilmData, Films } from '../types/types';
import { UserData } from '../types/user-data';
import { getCommentsFilm, getFilmData, getLikeThisFilm, getPromoFilm, loadFilms, redirectToRoute, requireAuth, setCommentsFilm, setDataLoadedStatus } from './action';

export const fetchFilmsDataAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchFilms',
    async (_arg, {dispatch, extra: api}) => {
      const {data} = await api.get<Films>(APIRoute.Films);
      dispatch(setDataLoadedStatus(true));
      dispatch(loadFilms(data));
      dispatch(setDataLoadedStatus(false));
    },
  );

export const checkAuthAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'user/checkAuth',
    async (_arg, {dispatch, extra: api}) => {
      try {
        await api.get(APIRoute.Login);
        dispatch(requireAuth(AuthStatus.Auth));
      } catch {
        dispatch(requireAuth(AuthStatus.NoAuth));
      }
    },
  );

export const loginAction = createAsyncThunk<void, AuthData, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'user/login',
    async ({login: email, password}, {dispatch, extra: api}) => {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(requireAuth(AuthStatus.Auth));
      dispatch(redirectToRoute(AppPagesRoute.Main));
    },
  );

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'user/logout',
    async (_arg, {dispatch, extra: api}) => {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuth(AuthStatus.NoAuth));
    },
  );

export const fetchFilmData = createAsyncThunk<void, number, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchFilm',
    async (id, {dispatch, extra: api}) => {
      try{
        const {data} = await api.get<FilmData>(`${APIRoute.Films}/${id}` );
        dispatch(setDataLoadedStatus(true));
        dispatch(getFilmData(data));
        dispatch(setDataLoadedStatus(false));
      }catch{
        dispatch(setDataLoadedStatus(false));
        dispatch(redirectToRoute(AppPagesRoute.NotFound));
      }
    },
  );

export const fetchLikeThisFilms = createAsyncThunk<void, number, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchLikeThisFilms',
    async (id, {dispatch, extra: api}) => {
      try{
        const {data} = await api.get<Films>(`${APIRoute.Films}/${id}/similar` );
        dispatch(setDataLoadedStatus(true));
        dispatch(getLikeThisFilm(data));
        dispatch(setDataLoadedStatus(false));
      }catch{
        dispatch(setDataLoadedStatus(false));
        dispatch(redirectToRoute(AppPagesRoute.NotFound));
      }
    },
  );

export const fetchPromoFilm = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchPromoFilms',
    async (_arg, {dispatch, extra: api}) => {
      try{
        const {data} = await api.get<FilmData>(`${APIRoute.Promo}`);
        dispatch(setDataLoadedStatus(true));
        dispatch(getPromoFilm(data));
        dispatch(setDataLoadedStatus(false));
      }catch{
        dispatch(setDataLoadedStatus(false));
      }
    },
  );

export const fetchCommentsFilm = createAsyncThunk<void, number, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'comments/fetchCommentsFilms',
    async (id, {dispatch, extra: api}) => {
      try{
        const {data} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
        dispatch(setDataLoadedStatus(true));
        dispatch(getCommentsFilm(data));
        dispatch(setDataLoadedStatus(false));
      }catch{
        dispatch(setDataLoadedStatus(false));
      }
    },
  );

export const addCommentFilm = createAsyncThunk<void, CommentAdd, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'comments/addComment',
    async ({id, comment, rating}, {dispatch, extra: api}) => {
      const {data} = await api.post<AnswerSendComments>(`${APIRoute.Comments}/${id}`, {comment, rating});
      dispatch(setCommentsFilm(data));
      dispatch(redirectToRoute(`${AppPagesRoute.ReturnFilmPage}/${id}`));
    },
  );
