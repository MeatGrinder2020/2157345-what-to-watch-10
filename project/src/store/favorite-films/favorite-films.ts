import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FavoriteFilms} from '../../types/state';
import {fetchFavoriteFilms, logoutAction} from '../api-actions';

const initialState: FavoriteFilms = {
  favoriteFilmsList: [],
  isLoadingFavoriteFilms: false
};

export const favoriteFilms = createSlice({
  name: NameSpace.FavoriteFilms,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteFilms.pending, (state) => {
        state.isLoadingFavoriteFilms = true;
      })
      .addCase(fetchFavoriteFilms.rejected, (state) => {
        state.isLoadingFavoriteFilms = false;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.favoriteFilmsList = action.payload;
        state.isLoadingFavoriteFilms = false;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favoriteFilmsList = [];
      });
  }
});
