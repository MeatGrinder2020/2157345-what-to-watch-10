import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppPagesRoute } from '../../const';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import MainPage from '../../pages/main-page/main-page';
import MoviePage from '../../pages/movie-page/movie-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PlayerPage from '../../pages/player-page/player-page';
import SingInPage from '../../pages/sign-in-page/sign-in-page';
import PrivateRoute from '../private-route/private-route';
import { AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import Loader from '../loader/loader';

function App(): JSX.Element {
  const {films, isDataLoading} = useAppSelector((state) => state);
  if (isDataLoading || films.length === 0) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
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
            <PrivateRoute authStatus={AuthStatus.Auth}>
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
            <PrivateRoute authStatus={AuthStatus.Auth}>
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
    </BrowserRouter> );
}

export default App;
