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
    MyList = '/favorite',
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


export enum NameSpace {
    Films = 'FILMS',
    Comments = 'COMMENTS',
    User = 'USER',
    FavoriteFilms = 'FAVORITE_FILMS'
}

export const MAX_SYMBOLS_COMMENT = 400;

export const MIN_SYMBOLS_COMMENT = 50;

export const GUEST_AVATAR_URL = 'img/guest.jpg';

export const RATING = {
  bad: {min: 0, max: 3},
  normal: {min: 3, max: 5},
  good: {min: 5, max: 8},
  veryGood: {min: 8, max: 10},
  awesome: {min: 10}
};

