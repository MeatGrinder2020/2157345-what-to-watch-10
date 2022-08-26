import {userProcess} from './user-process';
import {UserProcess} from '../../types/state';
import {AuthStatus} from '../../const';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import { makeFakeAratarUrl } from '../../utils/mocks';

const mockAvatarUrl = makeFakeAratarUrl();

describe('Reducer: user', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {authorizationStatus: AuthStatus.Unknown, avatarUrl:'/img/avatar.jpg'};
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthStatus.Unknown, avatarUrl:'/img/avatar.jpg'});
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type, payload: mockAvatarUrl.avatarUrl }))
        .toEqual({authorizationStatus: AuthStatus.Auth, avatarUrl: mockAvatarUrl.avatarUrl});
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({authorizationStatus: AuthStatus.NoAuth, avatarUrl:'/img/avatar.jpg'});
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: loginAction.fulfilled.type, payload: mockAvatarUrl.avatarUrl}))
        .toEqual({authorizationStatus: AuthStatus.Auth, avatarUrl:mockAvatarUrl.avatarUrl});
    });
    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({authorizationStatus: AuthStatus.NoAuth, avatarUrl:'/img/avatar.jpg'});
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({authorizationStatus: AuthStatus.NoAuth, avatarUrl:'/img/avatar.jpg'});
    });
  });
});
