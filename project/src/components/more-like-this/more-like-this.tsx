import { useAppSelector } from '../../hooks';
import { getFilmsData } from '../../store/films-data/selectors';
import ListFilms from '../list-films/list-films';

function MoreLikeThis():JSX.Element {
  const { likeThisFilms } = useAppSelector(getFilmsData);
  return(
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      <ListFilms films={likeThisFilms}/>
    </section>
  );
}

export default MoreLikeThis;
