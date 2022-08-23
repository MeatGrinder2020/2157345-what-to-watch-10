import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppPagesRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { AddInMyList, AnswerAddInMyList } from '../types/my-list-data';
import { AppDispatch, State } from '../types/state';
import { AnswerSendComments, AvatarUrl, CommentAdd, Comments, FilmData, Films } from '../types/types';
import { UserData } from '../types/user-data';
import { redirectToRoute } from './action';

export const fetchFilmsDataAction = createAsyncThunk<Films, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchFilms',
    async (_arg, {dispatch, extra: api}) => {
      const {data} = await api.get<Films>(APIRoute.Films);
      return data;
    },
  );

export const checkAuthAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'user/checkAuth',
    async (_arg, {dispatch, extra: api}) => {
      await api.get(APIRoute.Login);
    },
  );

export const loginAction = createAsyncThunk<AvatarUrl, AuthData, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'user/login',
    async ({login: email, password}, {dispatch, extra: api}) => {
      const {data:{token, avatarUrl}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(redirectToRoute(AppPagesRoute.Main));
      return avatarUrl;
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
    },
  );

export const fetchFilmData = createAsyncThunk<FilmData, number, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchFilm',
    async (id, {dispatch, extra: api}) => {
      const {data} = await api.get<FilmData>(`${APIRoute.Films}/${id}` );
      return data;
    },
  );

export const fetchLikeThisFilms = createAsyncThunk<Films, number, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchLikeThisFilms',
    async (id, {dispatch, extra: api}) => {
      const {data} = await api.get<Films>(`${APIRoute.Films}/${id}/similar` );
      return data;
    },
  );

export const fetchPromoFilm = createAsyncThunk<FilmData, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchPromoFilms',
    async (_arg, {dispatch, extra: api}) => {
      const {data} = await api.get<FilmData>(`${APIRoute.Promo}`);
      return data;
    },
  );

export const fetchCommentsFilm = createAsyncThunk<Comments, number, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'comments/fetchCommentsFilms',
    async (id, {dispatch, extra: api}) => {
      const {data} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
      return data;
    },
  );

export const addCommentFilm = createAsyncThunk<void, CommentAdd, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'comments/addComment',
    async ({id, comment, rating}, {dispatch, extra: api}) => {
      await api.post<AnswerSendComments>(`${APIRoute.Comments}/${id}`, {comment, rating});
      dispatch(redirectToRoute(`${AppPagesRoute.ReturnFilmPage}/${id}`));
    },
  );

export const fetchFavoriteFilms = createAsyncThunk<Films, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'favoriteFilms/fetchFavoriteFilms',
    async (_arg, {dispatch, extra: api}) => {
      const {data} = await api.get<Films>(`${APIRoute.MyList}`);
      return data;
    },
  );

export const changeMyListFilm = createAsyncThunk<void, AddInMyList, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'favoriteFilms/changeMyListFilm',
    async ({id, status}, {dispatch, extra: api}) => {
      await api.post<AnswerAddInMyList>(`${APIRoute.MyList}/${id}/${status}`);
      dispatch(fetchFavoriteFilms());
    },
  );
