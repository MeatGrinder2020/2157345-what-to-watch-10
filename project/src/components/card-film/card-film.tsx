import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FilmData } from '../../types/types';
import VideoPlayer from '../videoplayer/videoplayer';

type CardFilmProps = {
  filmData: FilmData,
  setIdActiveFilm: (id: number) => void
}

function CardFilm ({filmData, setIdActiveFilm}:CardFilmProps): JSX.Element {
  const navigate = useNavigate();
  const {id, name, previewImage} = filmData;
  const [isPlayedPreview, setIsPlayedPreview] = useState(false);
  const [startPlay, setStartPlay] = useState(false);
  const onMouseOverHandler = () => {
    setIdActiveFilm(id);
    setStartPlay(true);
  };
  const onMouseOutHandler = () => {
    setStartPlay(false);
  };
  const onClickHandler = () => {
    navigate(`/films/${id}`);
  };

  useEffect(()=>{
    let timer: NodeJS.Timeout;
    if (startPlay) {
      timer = setTimeout(() => {
        setIsPlayedPreview(true);
      }, 1000);
    } else {
      setIsPlayedPreview(false);
    }
    return () => {
      clearTimeout(timer);
    };
  },[startPlay]);
  return (
    <article className="small-film-card catalog__films-card"
      onMouseOver={onMouseOverHandler}
      onClick={onClickHandler}
      onMouseOut={onMouseOutHandler}
    >
      <div className="small-film-card__image">
        {isPlayedPreview ? <VideoPlayer filmData={filmData}/> : <img src={previewImage} alt={name} width="280" height="175" />}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}

export default CardFilm;
