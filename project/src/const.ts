import { FilmData } from './types/types';

export enum AppPagesRoute {
    Main='/',
    SignIn = '/login',
    MyList = '/mylist',
    Film = '/films/:id',
    AddReview = '/films/:id/review',
    Player = '/player/:id',
    NotFound = '/NotFound',
    ReturnFilmPage = '/films'
}

export enum AuthStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export const MAX_RATING_FILM = 10;

export enum APIRoute {
    Films = '/films',
    Login = '/login',
    Logout = '/logout',
    Promo ='/promo',
    Comments ='/comments',
}

export const TABS = ['Overview', 'Details', 'Reviews'];


export const INIT_FILM = {
  id: 0,
  name: '',
  posterImage: '',
  previewImage: '',
  backgroundImage: '',
  backgroundColor: '',
  videoLink: '',
  previewVideoLink: '',
  description: '',
  rating: 0,
  scoresCount: 0,
  director: '',
  starring: [''],
  runTime: 0,
  genre: '',
  released: 0,
  isFavorite: false
} as FilmData;

export const HOW_MATCH_SHOW_FILMS = 8;
