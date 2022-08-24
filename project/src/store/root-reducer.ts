import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { commentsData } from './comments-data/comments-data';
import { favoriteFilms } from './favorite-films/favorite-films';
import { filmsData } from './films-data/films-data';
import {userProcess} from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Comments]:commentsData.reducer,
  [NameSpace.Films]: filmsData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.FavoriteFilms]: favoriteFilms.reducer
});
