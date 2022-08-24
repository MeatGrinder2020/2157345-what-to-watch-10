type PlayerButtonPlayProp = {
    onClickHandler: () => void
}
function PlayerButtonPlay({onClickHandler}:PlayerButtonPlayProp):JSX.Element{
  return(
    <button type="button" className="player__play" onClick={onClickHandler}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
}

export default PlayerButtonPlay;
