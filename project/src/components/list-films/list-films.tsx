import { useState } from 'react';
import { FilmsObjectProps } from '../../types/types';
import CardFilm from '../card-film/card-film';

function ListFilms({films}: FilmsObjectProps):JSX.Element {
  const [, setIdActiveFilm] = useState(0);

  return (
    <div className="catalog__films-list">
      {films.map((filmObj) => (
        <CardFilm
          key={`cardFilm${filmObj.id}`}
          filmData = {filmObj}
          setIdActiveFilm = {setIdActiveFilm}
        />))}
    </div>
  );
}

export default ListFilms;
