import { useAppSelector } from '../../hooks';
import { FilmData, Films } from '../../types/types';
import ListFilms from '../list-films/list-films';

const getlikeThisFilms = (films: Films, currentFilm: FilmData) => {
  const {genre, id} = currentFilm;
  const likeThisFilms = films.filter((film)=>(film.genre === genre && film.id !== id)).slice(0,3);
  return likeThisFilms;
};

type MoreLikeThisProps = {
    currentFilm:FilmData
}

function MoreLikeThis({currentFilm}:MoreLikeThisProps):JSX.Element {
  const { films } = useAppSelector((state)=>state);
  return(<ListFilms films={getlikeThisFilms(films, currentFilm)}/>);
}

export default MoreLikeThis;
