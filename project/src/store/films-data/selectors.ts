import {NameSpace} from '../../const';
import {FilmsData, State} from '../../types/state';

export const getFilmsData = (state: State): FilmsData => state[NameSpace.Films];
