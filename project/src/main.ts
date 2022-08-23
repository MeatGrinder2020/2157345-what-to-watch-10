import { AuthStatus } from './const';

export const isCheckedAuth = (authorizationStatus: AuthStatus): boolean =>
  authorizationStatus === AuthStatus.Unknown;

export const getDurationFilm = (runTime: number) => {
  const hours = Math.floor(runTime / 60);
  const minutes = runTime - hours * 60;
  return `${hours}h ${minutes}m`;
};

export const getRemindedTimeFilm = (durationFilm: number) => {
  const hours = Math.floor(durationFilm / 3600);
  const minutes = Math.floor((durationFilm - hours * 3600) / 60);
  const seconds = Math.floor(durationFilm - hours * 3600 - minutes * 60);
  const forShowSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const forShowMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const forShowhours = hours < 10 ? `0${hours}` : hours;
  const fullFormatForShow = hours === 0 ? `${forShowMinutes}:${forShowSeconds}` : `${forShowhours}:${forShowMinutes}:${forShowSeconds}`;
  return fullFormatForShow;
};
