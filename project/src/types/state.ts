import { AuthStatus } from '../const.js';
import {store} from '../store/index.js';
import { Comments, FilmData, Films } from './types.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
    authorizationStatus: AuthStatus
};

export type FilmsData = {
    films: Films,
    filteredFilmsGenre: Films,
    isDataLoading: boolean,
    currentFilm: FilmData,
    likeThisFilms: Films,
    promoFilm: FilmData,
    isDataCurrentFilmLoading: boolean,
    isDataLikeThisFilmLoading: boolean,
    isDataPromoFilmLoading: boolean
}

export type CommentsData = {
    currentFilmComments: Comments,
    isDataCommentsLoading: boolean,
}
