import { INIT_FILM } from '../../const';
import { FilmsData } from '../../types/state';
import { makeFakeFilmsData } from '../../utils/mocks';
import { filterFilmGenre } from '../action';
import { fetchFilmData, fetchFilmsDataAction, fetchLikeThisFilms, fetchPromoFilm } from '../api-actions';
import { filmsData } from './films-data';

const mockFilmsData = makeFakeFilmsData();

describe ('Reducer: films', () => {
  let state: FilmsData;
  beforeEach(() => {
    state = {
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
  });
  it('without additional parameters should return initial state', () => {
    expect(filmsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        films: [],
        filteredFilmsGenre: [],
        isDataLoading: false,
        currentFilm: INIT_FILM,
        isDataCurrentFilmLoading: false,
        likeThisFilms: [],
        isDataLikeThisFilmLoading: false,
        promoFilm: INIT_FILM,
        isDataPromoFilmLoading: false
      });
  });

  describe ('fetchFilmsDataAction test', () => {
    it('should be updated isDataLoading to true if fetchFilmsDataAction pending', () => {
      expect(filmsData.reducer(state, {type: fetchFilmsDataAction.pending.type }))
        .toEqual({
          films: [],
          filteredFilmsGenre: [],
          isDataLoading: true,
          currentFilm: INIT_FILM,
          isDataCurrentFilmLoading: false,
          likeThisFilms: [],
          isDataLikeThisFilmLoading: false,
          promoFilm: INIT_FILM,
          isDataPromoFilmLoading: false
        });
    });
    it('should be updated films by load films if fetchFilmsDataAction fulfilled', () => {
      expect(filmsData.reducer(state, {type: fetchFilmsDataAction.fulfilled.type, payload: mockFilmsData.films }))
        .toEqual({
          films: mockFilmsData.films,
          filteredFilmsGenre: [],
          isDataLoading: false,
          currentFilm: INIT_FILM,
          isDataCurrentFilmLoading: false,
          likeThisFilms: [],
          isDataLikeThisFilmLoading: false,
          promoFilm: INIT_FILM,
          isDataPromoFilmLoading: false
        });
    });
  });

  describe ('fetchFilmData test', () => {
    it('should be updated isDataCurrentFilmLoading to true if fetchFilmData pending', () => {
      expect(filmsData.reducer(state, {type: fetchFilmData.pending.type }))
        .toEqual({
          films: [],
          filteredFilmsGenre: [],
          isDataLoading: false,
          currentFilm: INIT_FILM,
          isDataCurrentFilmLoading: true,
          likeThisFilms: [],
          isDataLikeThisFilmLoading: false,
          promoFilm: INIT_FILM,
          isDataPromoFilmLoading: false
        });
    });
    it('should be updated currentFilm by load film if fetchFilmData fulfilled', () => {
      expect(filmsData.reducer(state, {type: fetchFilmData.fulfilled.type, payload: mockFilmsData.films[0] }))
        .toEqual({
          films: [],
          filteredFilmsGenre: [],
          isDataLoading: false,
          currentFilm: mockFilmsData.films[0],
          isDataCurrentFilmLoading: false,
          likeThisFilms: [],
          isDataLikeThisFilmLoading: false,
          promoFilm: INIT_FILM,
          isDataPromoFilmLoading: false
        });
    });
  });

  describe ('fetchLikeThisFilms test', () => {
    it('should be updated isDataLikeThisFilmLoading to true if fetchLikeThisFilms pending', () => {
      expect(filmsData.reducer(state, {type: fetchLikeThisFilms.pending.type }))
        .toEqual({
          films: [],
          filteredFilmsGenre: [],
          isDataLoading: false,
          currentFilm: INIT_FILM,
          isDataCurrentFilmLoading: false,
          likeThisFilms: [],
          isDataLikeThisFilmLoading: true,
          promoFilm: INIT_FILM,
          isDataPromoFilmLoading: false
        });
    });
    it('should be updated likeThisFilms by load films if fetchLikeThisFilms fulfilled', () => {
      expect(filmsData.reducer(state, {type: fetchFilmData.fulfilled.type, payload: mockFilmsData.films }))
        .toEqual({
          films: [],
          filteredFilmsGenre: [],
          isDataLoading: false,
          currentFilm: mockFilmsData.films,
          isDataCurrentFilmLoading: false,
          likeThisFilms: [],
          isDataLikeThisFilmLoading: false,
          promoFilm: INIT_FILM,
          isDataPromoFilmLoading: false
        });
    });
  });

  describe ('fetchPromoFilm test', () => {
    it('should be updated isDataPromoFilmLoading to true if fetchPromoFilm pending', () => {
      expect(filmsData.reducer(state, {type: fetchPromoFilm.pending.type }))
        .toEqual({
          films: [],
          filteredFilmsGenre: [],
          isDataLoading: false,
          currentFilm: INIT_FILM,
          isDataCurrentFilmLoading: false,
          likeThisFilms: [],
          isDataLikeThisFilmLoading: false,
          promoFilm: INIT_FILM,
          isDataPromoFilmLoading: true
        });
    });
    it('should be updated fetchPromoFilm by load film if fetchPromoFilm fulfilled', () => {
      expect(filmsData.reducer(state, {type: fetchPromoFilm.fulfilled.type, payload: mockFilmsData.films[0] }))
        .toEqual({
          films: [],
          filteredFilmsGenre: [],
          isDataLoading: false,
          currentFilm: INIT_FILM,
          isDataCurrentFilmLoading: false,
          likeThisFilms: [],
          isDataLikeThisFilmLoading: false,
          promoFilm: mockFilmsData.films[0],
          isDataPromoFilmLoading: false
        });
    });
  });

  describe ('filterFilmGenre test', () => {
    beforeEach(() => {
      state = {
        films: mockFilmsData.films,
        filteredFilmsGenre: [],
        isDataLoading: false,
        currentFilm: INIT_FILM,
        isDataCurrentFilmLoading: false,
        likeThisFilms: [],
        isDataLikeThisFilmLoading: false,
        promoFilm: INIT_FILM,
        isDataPromoFilmLoading: false
      };
    });
    it('should be updated filteredFilmsGenre by genre if filterFilmGenre', () => {
      expect(filmsData.reducer(state, {type: filterFilmGenre.type, payload: 'All genres' }))
        .toEqual({
          films: mockFilmsData.films,
          filteredFilmsGenre: mockFilmsData.films,
          isDataLoading: false,
          currentFilm: INIT_FILM,
          isDataCurrentFilmLoading: false,
          likeThisFilms: [],
          isDataLikeThisFilmLoading: false,
          promoFilm: INIT_FILM,
          isDataPromoFilmLoading: false
        });
    });
  });
});
