import {Navigate} from 'react-router-dom';
import {AppPagesRoute, AuthStatus} from '../../const';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus} = useAppSelector((state) => state);
  const { children } = props;

  return (
    authorizationStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppPagesRoute.SignIn} />
  );
}

export default PrivateRoute;
