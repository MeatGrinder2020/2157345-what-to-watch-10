import {NameSpace} from '../../const';
import { FavoriteFilms, State} from '../../types/state';

export const getFavoriteFilmsData = (state: State): FavoriteFilms => state[NameSpace.FavoriteFilms];
