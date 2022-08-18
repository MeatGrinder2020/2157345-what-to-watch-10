import { Route, Routes } from 'react-router-dom';
import { AppPagesRoute } from '../../const';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import MainPage from '../../pages/main-page/main-page';
import MoviePage from '../../pages/movie-page/movie-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PlayerPage from '../../pages/player-page/player-page';
import SingInPage from '../../pages/sign-in-page/sign-in-page';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import Loader from '../loader/loader';
import { isCheckedAuth } from '../../main';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-router/history-router';
import { getFilmsData } from '../../store/films-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function App(): JSX.Element {
  const {films, isDataLoading, isDataPromoFilmLoading } = useAppSelector(getFilmsData);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  if (isCheckedAuth(authorizationStatus) || isDataLoading || films.length === 0 || isDataPromoFilmLoading) {
    return <Loader />;
  }
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppPagesRoute.Main}
          element={<MainPage />}
        />
        <Route
          path={AppPagesRoute.SignIn}
          element={<SingInPage />}
        />
        <Route
          path={AppPagesRoute.MyList}
          element={
            <PrivateRoute>
              <MyListPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppPagesRoute.Film}
          element={<MoviePage />}
        />
        <Route
          path={AppPagesRoute.AddReview}
          element={
            <PrivateRoute>
              <AddReviewPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppPagesRoute.Player}
          element={<PlayerPage />}
        />
        <Route
          path={'*'}
          element={<NotFoundPage />}
        />
      </Routes>
    </HistoryRouter> );
}

export default App;
