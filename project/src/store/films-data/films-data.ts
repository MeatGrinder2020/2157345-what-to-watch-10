import {createSlice} from '@reduxjs/toolkit';
import {INIT_FILM, NameSpace} from '../../const';
import {FilmsData} from '../../types/state';
import { Films } from '../../types/types';
import { filterFilmGenre } from '../action';
import { fetchFilmData, fetchFilmsDataAction, fetchLikeThisFilms, fetchPromoFilm } from '../api-actions';

const initialState: FilmsData = {
  films: [],
  filteredFilmsGenre: [],
  isDataLoading: false,
  currentFilm: INIT_FILM,
  isDataCurrentFilmLoading: false,
  likeThisFilms: [],
  isDataLikeThisFilmLoading: false,
  promoFilm: INIT_FILM,
  isDataPromoFilmLoading: false
};

export const filmsData = createSlice({
  name:NameSpace.Films,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsDataAction.pending, (state)=>{
        state.isDataLoading = true;
      })
      .addCase(fetchFilmsDataAction.fulfilled, (state, action)=>{
        state.films = action.payload;
        state.isDataLoading = false;
      })
      .addCase(filterFilmGenre, (state, action) => {
        const chosedGenre = action.payload;
        const allFilms = state.films;
        const filteredFilms: Films = allFilms.filter((film) => film.genre === chosedGenre);
        state.filteredFilmsGenre = chosedGenre === 'All genres' ? allFilms : filteredFilms;
      })
      .addCase(fetchFilmData.pending, (state)=>{
        state.isDataCurrentFilmLoading = true;
      })
      .addCase(fetchFilmData.fulfilled, (state, action)=>{
        state.currentFilm = action.payload;
        state.isDataCurrentFilmLoading = false;
      })
      .addCase(fetchLikeThisFilms.pending, (state)=>{
        state.isDataLikeThisFilmLoading = true;
      })
      .addCase(fetchLikeThisFilms.fulfilled, (state, action)=>{
        state.likeThisFilms = action.payload;
        state.isDataLikeThisFilmLoading = false;
      })
      .addCase(fetchPromoFilm.pending, (state)=>{
        state.isDataPromoFilmLoading = true;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action)=>{
        state.promoFilm = action.payload;
        state.isDataPromoFilmLoading = false;
      });
  }

});
