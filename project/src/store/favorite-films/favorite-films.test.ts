import { FavoriteFilms } from '../../types/state';
import { makeFakeFilmsData } from '../../utils/mocks';
import { fetchFavoriteFilms, logoutAction } from '../api-actions';
import { favoriteFilms } from './favorite-films';

const mockFilmsData = makeFakeFilmsData();

describe ('Reducer: favoriteFilms', () => {
  let state: FavoriteFilms;
  beforeEach(() => {
    state = {
      favoriteFilmsList: [],
      isLoadingFavoriteFilms: false
    };
  });
  it('without additional parameters should return initial state', () => {
    expect(favoriteFilms.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        favoriteFilmsList: [],
        isLoadingFavoriteFilms: false
      });
  });

  describe ('fetchFavoriteFilms test', () => {
    it('should be updated isLoadingFavoriteFilms to true if fetchFavoriteFilms pending', () => {
      expect(favoriteFilms.reducer(state, {type: fetchFavoriteFilms.pending.type }))
        .toEqual({
          favoriteFilmsList: [],
          isLoadingFavoriteFilms: true
        });
    });
    it('should be updated isLoadingFavoriteFilms to false if fetchFavoriteFilms reject', () => {
      expect(favoriteFilms.reducer(state, {type: fetchFavoriteFilms.rejected.type }))
        .toEqual({
          favoriteFilmsList: [],
          isLoadingFavoriteFilms: false
        });
    });
    it('should be updated favoriteFilmsList to films if fetchFavoriteFilms fulfilled', () => {
      expect(favoriteFilms.reducer(state, {type: fetchFavoriteFilms.fulfilled.type, payload: mockFilmsData.films }))
        .toEqual({
          favoriteFilmsList: mockFilmsData.films,
          isLoadingFavoriteFilms: false
        });
    });
  });
  describe ('logoutAction test', () => {
    it('should be updated favoriteFilmsList to [] if logoutAction fulfilled', () => {
      expect(favoriteFilms.reducer(state, {type: logoutAction.fulfilled.type }))
        .toEqual({
          favoriteFilmsList: [],
          isLoadingFavoriteFilms: false
        });
    });
  });
});
