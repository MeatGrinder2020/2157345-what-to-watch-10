import { FilmData } from '../../types/types';

type VideoFilmProps = {
    filmData: FilmData,
    isMuted?: boolean,
  }

function VideoPlayer({filmData, isMuted = true}: VideoFilmProps): JSX.Element {
  const {videoLink, posterImage} = filmData;
  return (
    <video src={videoLink} className="player__video" poster={posterImage} muted={isMuted} autoPlay></video>
  );
}

export default VideoPlayer;
