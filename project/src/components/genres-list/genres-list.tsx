import { SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { filterFilmGenre } from '../../store/action';
import { FilmsObjectProps } from '../../types/types';

function GenresList({films}: FilmsObjectProps):JSX.Element {
  const arrayGenresFilms = ['All genres', ...new Set(films.map((film)=>film.genre))];
  const [activeGenre, setActiveGenre] = useState('All genres');
  const dispatch = useAppDispatch();
  const onClickGenreHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    const {id} = event.target as HTMLTextAreaElement;
    setActiveGenre(id);
  };
  useEffect(()=>{
    dispatch(filterFilmGenre(activeGenre));
  },[activeGenre, dispatch]);

  return (
    <ul className="catalog__genres-list">
      {arrayGenresFilms.map((genre)=>(
        <li key={genre} className={genre !== activeGenre ? 'catalog__genres-item' : 'catalog__genres-item catalog__genres-item--active'}>
          <a href="/" className="catalog__genres-link" onClick={onClickGenreHandler} id={genre}>{genre}</a>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
