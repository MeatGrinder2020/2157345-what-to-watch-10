import {Navigate} from 'react-router-dom';
import {AppPagesRoute, AuthStatus} from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { children } = props;

  return (
    authorizationStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppPagesRoute.SignIn} />
  );
}

export default PrivateRoute;
