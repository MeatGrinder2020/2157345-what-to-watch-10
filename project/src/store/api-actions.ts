import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppPagesRoute, AuthStatus } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { AppDispatch, State } from '../types/state';
import { Films } from '../types/types';
import { UserData } from '../types/user-data';
import { loadFilms, redirectToRoute, requireAuth, setDataLoadedStatus } from './action';

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

