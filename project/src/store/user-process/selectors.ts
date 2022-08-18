import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {AuthStatus} from '../../const';

export const getAuthorizationStatus = (state: State): AuthStatus => state[NameSpace.User].authorizationStatus;
