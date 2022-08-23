import { FilmData } from './types';

export type AddInMyList = {
    id: number,
    status: number
}

export type AnswerAddInMyListtError = {
    error: string
}

export type AnswerAddInMyList = FilmData | AnswerAddInMyListtError;
