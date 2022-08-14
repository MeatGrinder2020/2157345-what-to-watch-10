import { useAppSelector } from '../../hooks';
import ListFilms from '../list-films/list-films';

function MoreLikeThis():JSX.Element {
  const { likeThisFilms } = useAppSelector((state)=>state);
  return(<ListFilms films={likeThisFilms}/>);
}

export default MoreLikeThis;
