import { useState } from 'react';
import { TABS } from '../../const';
import MovieDetails from '../../pages/movie-page/movie-details';
import MovieOverview from '../../pages/movie-page/movie-overview';
import MovieReviews from '../../pages/movie-page/movie-reviews';
import { FilmData } from '../../types/types';
import Tab from './tab';

type TabsProps = {
    currentFilm: FilmData
}

function Tabs({currentFilm}:TabsProps):JSX.Element{
  const [activeTab, setActiveTab] = useState(TABS[0]);
  return(
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {TABS.map((tab) => (
            <Tab key={tab} tabName={tab} isActive={tab === activeTab} setActiveTab={setActiveTab} />)
          )}
        </ul>
      </nav>
      {activeTab === TABS[0] && <MovieOverview currentFilm={currentFilm}/>}
      {activeTab === TABS[1] && <MovieDetails currentFilm={currentFilm}/>}
      {activeTab === TABS[2] && <MovieReviews currentFilm={currentFilm}/>}
    </div>);
}

export default Tabs;
