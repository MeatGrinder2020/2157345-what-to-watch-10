import { HOW_MATCH_SHOW_FILMS } from '../../const';

type ShowMoreProps = {
    incForShow: number,
    showMoreFilms: (inc: number)=>void
}
function ShowMore({incForShow, showMoreFilms}:ShowMoreProps):JSX.Element {
  const handleOnClick = () => {
    showMoreFilms(incForShow + HOW_MATCH_SHOW_FILMS);
  };
  return(
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={handleOnClick}>Show more</button>
    </div>
  );
}

export default ShowMore;
