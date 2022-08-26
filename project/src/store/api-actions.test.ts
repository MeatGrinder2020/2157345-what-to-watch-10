import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {checkAuthAction, loginAction, fetchFilmData, fetchFilmsDataAction, logoutAction, fetchLikeThisFilms, fetchPromoFilm, fetchCommentsFilm, addCommentFilm, fetchFavoriteFilms, changeMyListFilm} from './api-actions';
import {APIRoute} from '../const';
import {State} from '../types/state';
import {AuthData} from '../types/auth-data';
import {redirectToRoute} from './action';
import { makeFakeCommentsData, makeFakeFilmsData } from '../utils/mocks';

const mockCommentsData = makeFakeCommentsData();
const mockFilmsData = makeFakeFilmsData();
const {id} = mockFilmsData.films[0];

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('2157345-what-to-watch-10', 'secret');
  });

  it('should dispatch Load_Films when GET /films', async () => {
    mockAPI
      .onGet(APIRoute.Films)
      .reply(200, mockFilmsData.films);

    const store = mockStore();

    await store.dispatch(fetchFilmsDataAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmsDataAction.pending.type,
      fetchFilmsDataAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Film when GET /films/{filmId}', async () => {
    mockAPI
      .onGet(`${APIRoute.Films}/${id}`)
      .reply(200, mockFilmsData.films[0]);

    const store = mockStore();

    await store.dispatch(fetchFilmData(id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmData.pending.type,
      fetchFilmData.fulfilled.type
    ]);
  });

  it('should dispatch Load_LikeThisFilm when GET /films/{filmId}/similar', async () => {
    mockAPI
      .onGet(`${APIRoute.Films}/${id}/similar`)
      .reply(200, mockFilmsData.films);

    const store = mockStore();

    await store.dispatch(fetchLikeThisFilms(id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchLikeThisFilms.pending.type,
      fetchLikeThisFilms.fulfilled.type
    ]);
  });

  it('should dispatch Load_PromoFilm when GET /promo', async () => {
    mockAPI
      .onGet(`${APIRoute.Promo}`)
      .reply(200, mockFilmsData.films[0]);

    const store = mockStore();

    await store.dispatch(fetchPromoFilm());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoFilm.pending.type,
      fetchPromoFilm.fulfilled.type
    ]);
  });

  it('should dispatch Load_CommentsFilm when GET /comments/{filmId}', async () => {
    mockAPI
      .onGet(`${APIRoute.Comments}/${id}`)
      .reply(200, mockCommentsData);

    const store = mockStore();

    await store.dispatch(fetchCommentsFilm(id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCommentsFilm.pending.type,
      fetchCommentsFilm.fulfilled.type
    ]);
  });

  it('should dispatch addCommentsFilm when POST /comments/{filmId}', async () => {
    const { comment, rating} = mockCommentsData[0];
    mockAPI
      .onPost(`${APIRoute.Comments}/${id}`)
      .reply(200, mockCommentsData);

    const store = mockStore();

    await store.dispatch(addCommentFilm({id, comment, rating}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addCommentFilm.pending.type,
      redirectToRoute.type,
      addCommentFilm.fulfilled.type,
    ]);
  });

  it('should dispatch Load_FavoriteFilms when GET /favorite', async () => {
    mockAPI
      .onGet(`${APIRoute.MyList}`)
      .reply(200, mockFilmsData.films);

    const store = mockStore();

    await store.dispatch(fetchFavoriteFilms());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoriteFilms.pending.type,
      fetchFavoriteFilms.fulfilled.type
    ]);
  });

  it('should dispatch changeMyListFilm when POST /comments/{filmId}', async () => {
    const status = 1;
    mockAPI
      .onPost(`${APIRoute.MyList}/${id}/${status}`)
      .reply(200, mockCommentsData);

    const store = mockStore();

    await store.dispatch(changeMyListFilm({id, status}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeMyListFilm.pending.type,
      fetchFavoriteFilms.pending.type,
      changeMyListFilm.fulfilled.type,
    ]);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('2157345-what-to-watch-10');
  });
});
