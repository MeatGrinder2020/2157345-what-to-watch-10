import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {CommentsData} from '../../types/state';
import { addCommentFilm, fetchCommentsFilm, } from '../api-actions';

const initialState: CommentsData = {
  currentFilmComments: [],
  isDataCommentsLoading: false,
  isAddCommentsError: false,
};

export const commentsData = createSlice({
  name:NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsFilm.pending, (state)=>{
        state.isDataCommentsLoading = true;
      })
      .addCase(fetchCommentsFilm.fulfilled, (state, action)=>{
        state.currentFilmComments = action.payload;
        state.isDataCommentsLoading = false;
      })
      .addCase(addCommentFilm.pending, (state)=>{
        state.isDataCommentsLoading = true;
        state.isAddCommentsError = false;
      })
      .addCase(addCommentFilm.fulfilled, (state)=>{
        state.isDataCommentsLoading = false;
        state.isAddCommentsError = false;
      })
      .addCase(addCommentFilm.rejected, (state)=>{
        state.isAddCommentsError = true;
      });
  }
});
