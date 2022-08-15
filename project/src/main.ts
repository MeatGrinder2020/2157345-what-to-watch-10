import { AuthStatus } from './const';

export const isCheckedAuth = (authorizationStatus: AuthStatus): boolean =>
  authorizationStatus === AuthStatus.Unknown;
