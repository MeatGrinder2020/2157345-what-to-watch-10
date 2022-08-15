import { AuthStatus } from '../const';

type FilmData = {
  id: number
  name: string
  posterImage: string
  previewImage: string
  backgroundImage: string
  backgroundColor: string
  videoLink: string
  previewVideoLink: string
  description: string
  rating: number
  scoresCount: number
  director: string
  starring: [string]
  runTime: number
  genre: string
  released: number
  isFavorite: boolean
  };

type Films = FilmData[];

type FilmsObjectProps = {
  films: Films,
};

type FilmDataProps = {
  filmData: FilmData,
};

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element;
}

type AddReviewObj = {
    comment: string
    date: string
    id: number
    rating: number
    user: {
    id: number
    name: string
    }
}

type MovieTabsProps = {
  currentFilm: FilmData
}

type CommentData = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: {
    id: number
    name: string
  }
};

type Comments = CommentData[] | []

type CommentAdd = {
  id: number
  comment: string
  rating: number
}

type AnswerSendCommentError = {
  error: string
}

type AnswerSendComments = Comments | AnswerSendCommentError

export type {FilmData, FilmsObjectProps, PrivateRouteProps, Films, FilmDataProps, AddReviewObj, MovieTabsProps, CommentData, Comments, CommentAdd, AnswerSendComments};
