import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getRemindedTimeFilm } from '../../main';
import { getFilmsData } from '../../store/films-data/selectors';
import PlayerButtonPause from './player-button-pause';
import PlayerButtonPlay from './player-button-play';

const getCurrentProgress = (currentTime: number, duration: number):string => `${Math.floor(currentTime * 100 / duration)}`;

function PlayerPage(): JSX.Element {
  const navigate = useNavigate();
  const {films} = useAppSelector(getFilmsData);
  const {id} = useParams();
  const [currentFilmPlaying] = films.filter((film) => film.id.toString() === id);
  const {videoLink, name, backgroundImage, runTime} = currentFilmPlaying;
  const video = useRef<HTMLVideoElement>(null);
  const progressElem = useRef<HTMLProgressElement>(null);
  const videoContainer = useRef<HTMLDivElement>(null);
  const [isPlayFilm, setIsPlayFilm] = useState(false);
  const [progress, setProgress] = useState('0');
  const [currentTime, setCurrentTime] = useState(getRemindedTimeFilm(runTime * 60));
  const handleOnClick = () => {
    setIsPlayFilm(!isPlayFilm);
  };
  const handleOnClickExit = () => {
    navigate(`/films/${id}`);
  };
  const handleFullscreen = useCallback(() => {
    if (document.fullscreenElement !== null) {
      // The document is in fullscreen mode
      document.exitFullscreen();
      setFullscreenData('false');
    } else {
      // The document is not in fullscreen mode
      if (videoContainer.current) { videoContainer.current.requestFullscreen(); }
      setFullscreenData('true');
    }
  },[]);
  const setFullscreenData = (isInFullScreen: string) => {
    if (videoContainer.current) {videoContainer.current.setAttribute('data-fullscreen', isInFullScreen.toString());}
  };
  useEffect(()=>{
    if (isPlayFilm) {
      if (video.current) { video.current.play(); }
    } else {
      if (video.current) { video.current.pause(); }
    }
  },[isPlayFilm]);
  useEffect(()=>{
    if (video.current) {
      video.current.addEventListener('timeupdate', () => {
        if (video.current) {
          setProgress(getCurrentProgress(video.current.currentTime, video.current.duration));
          const remainedTime = Number(video.current.duration) - Number(video.current.currentTime);
          setCurrentTime(getRemindedTimeFilm(remainedTime));
        }
      });
    }
    if (progressElem.current) {
      progressElem.current.addEventListener('click', (e) => {
        if (progressElem.current) {
          const rect = progressElem.current.getBoundingClientRect();
          const pos = (e.pageX - rect.left) / progressElem.current.offsetWidth;
          if (video.current) { video.current.currentTime = pos * video.current.duration; }
        }
      });
    }
  }, []);

  return(
    <div ref={videoContainer} className="player">
      <video ref={video} src={videoLink} className="player__video" poster={backgroundImage} autoPlay></video>

      <button type="button" className="player__exit" onClick={handleOnClickExit}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress ref={progressElem} className="player__progress" value={`${progress}`} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{`-${currentTime}`}</div>
        </div>

        <div className="player__controls-row">
          {!isPlayFilm ? <PlayerButtonPlay handleOnClick={handleOnClick}/> : <PlayerButtonPause handleOnClick={handleOnClick}/>}
          <div className="player__name">{name}</div>

          <button type="button" className="player__full-screen" onClick={handleFullscreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default PlayerPage;
