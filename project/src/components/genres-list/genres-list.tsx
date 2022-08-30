import { SyntheticEvent, useEffect, useState } from 'react';
import { HOW_MATCH_SHOW_FILMS } from '../../const';
import { useAppDispatch } from '../../hooks';
import { filterFilmGenre } from '../../store/action';

type GenresListProps = {
    genresFilms: string[],
    setIncForShow: (incForShow: number)=>void
}

function GenresList({genresFilms, setIncForShow}: GenresListProps):JSX.Element {
  const [activeGenre, setActiveGenre] = useState(genresFilms[0]);
  const dispatch = useAppDispatch();
  const genresForShow = genresFilms.slice(0, 9);
  const handleOnClick = (e:SyntheticEvent, genre: string) => {
    e.preventDefault();
    setActiveGenre(genre);
    setIncForShow(HOW_MATCH_SHOW_FILMS);
  };
  useEffect(()=>{
    dispatch(filterFilmGenre(activeGenre));
  },[activeGenre, dispatch]);

  return (
    <ul className="catalog__genres-list">
      {genresForShow.map((genre)=>(
        <li key={genre} className={genre !== activeGenre ? 'catalog__genres-item' : 'catalog__genres-item catalog__genres-item--active'}>
          <a href="/" className="catalog__genres-link" onClick={(e)=>handleOnClick(e, genre)}>{genre}</a>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
