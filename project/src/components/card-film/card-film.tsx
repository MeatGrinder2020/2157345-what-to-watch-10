import { Link, useNavigate } from 'react-router-dom';
import { FilmData } from '../../types/types';

type CardFilmProps = {
  filmData: FilmData,
  setIdActiveFilm: (id: number) => void
}

function CardFilm ({filmData, setIdActiveFilm}:CardFilmProps): JSX.Element {
  const navigate = useNavigate();
  const {id, name, previewImage} = filmData;
  return (
    <article className="small-film-card catalog__films-card"
      onMouseOver={() => setIdActiveFilm(id)}
      onClick={()=>navigate(`/films/${id}`)}
    >
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}

export default CardFilm;
