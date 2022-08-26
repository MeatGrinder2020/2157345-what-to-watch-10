import { CommentsData } from '../../types/state';
import { makeFakeCommentsData } from '../../utils/mocks';
import { addCommentFilm, fetchCommentsFilm, } from '../api-actions';
import { commentsData } from './comments-data';

const mockCommentsData = makeFakeCommentsData();

describe ('Reducer: commentsData', () => {
  let state: CommentsData;
  beforeEach(() => {
    state = {
      currentFilmComments: [],
      isDataCommentsLoading: false,
      isAddCommentsError: false,
    };
  });
  it('without additional parameters should return initial state', () => {
    expect(commentsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        currentFilmComments: [],
        isDataCommentsLoading: false,
        isAddCommentsError: false,
      });
  });

  describe ('fetchCommentsFilm test', () => {
    it('should be updated isDataCommentsLoading to true if fetchCommentsFilm pending', () => {
      expect(commentsData.reducer(state, {type: fetchCommentsFilm.pending.type }))
        .toEqual({
          currentFilmComments: [],
          isDataCommentsLoading: true,
          isAddCommentsError: false,
        });
    });
    it('should be updated currentFilmComments to commentsFilm if fetchCommentsFilm fulfilled', () => {
      expect(commentsData.reducer(state, {type: fetchCommentsFilm.fulfilled.type, payload: mockCommentsData }))
        .toEqual({
          currentFilmComments: mockCommentsData,
          isDataCommentsLoading: false,
          isAddCommentsError: false,
        });
    });
  });
  describe ('addCommentFilm test', () => {
    it('should be updated isDataCommentsLoading to true if addCommentFilm pending', () => {
      expect(commentsData.reducer(state, {type: addCommentFilm.pending.type }))
        .toEqual({
          currentFilmComments: [],
          isDataCommentsLoading: true,
          isAddCommentsError: false,
        });
    });
    it('should be updated isDataCommentsLoading to false if addCommentFilm fulfilled', () => {
      expect(commentsData.reducer(state, {type: addCommentFilm.fulfilled.type }))
        .toEqual({
          currentFilmComments: [],
          isDataCommentsLoading: false,
          isAddCommentsError: false,
        });
    });
    it('should be updated isAddCommentsError to true if addCommentFilm rejected', () => {
      expect(commentsData.reducer(state, {type: addCommentFilm.rejected.type }))
        .toEqual({
          currentFilmComments: [],
          isDataCommentsLoading: false,
          isAddCommentsError: true,
        });
    });
  });
});
