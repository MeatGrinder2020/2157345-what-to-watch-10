import { NameSpace } from '../../const';
import { CommentsData, State } from '../../types/state';

export const getCommentsData = (state:State):CommentsData => state[NameSpace.Comments];
