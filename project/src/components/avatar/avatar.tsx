import { Link, useNavigate } from 'react-router-dom';
import { AppPagesRoute, AuthStatus, GUEST_AVATAR_URL } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getAvatarUrl } from '../../store/user-process/selectors';

function Avatar():JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const avatarUrl = useAppSelector(getAvatarUrl);
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  return(
    <ul className="user-block">
      <li className="user-block__item" onClick={()=>navigate('/mylist')}>
        <div className="user-block__avatar">
          <img src={authorizationStatus === AuthStatus.Auth ? avatarUrl : GUEST_AVATAR_URL} alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        {authorizationStatus === AuthStatus.Auth ?
          <Link className="user-block__link" to="" onClick={handleLogout}>Sign out</Link>
          : <Link className="user-block__link" to={AppPagesRoute.SignIn}>Sign in</Link>}
      </li>
    </ul>
  );
}

export default Avatar;
