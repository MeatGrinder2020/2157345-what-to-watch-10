type PlayerButtonPauseProp = {
    onClickHandler: () => void
}
function PlayerButtonPause({onClickHandler}:PlayerButtonPauseProp):JSX.Element {
  return(
    <button type="button" className="player__play" onClick={onClickHandler}>
      <svg viewBox="0 0 14 21" width="14" height="21">
        <use xlinkHref="#pause"></use>
      </svg>
      <span>Pause</span>
    </button>
  );
}

export default PlayerButtonPause;
