import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {AuthStatus} from '../../const';
import { AvatarUrl } from '../../types/types';

export const getAuthorizationStatus = (state: State): AuthStatus => state[NameSpace.User].authorizationStatus;

export const getAvatarUrl = (state: State): AvatarUrl => state[NameSpace.User].avatarUrl;
