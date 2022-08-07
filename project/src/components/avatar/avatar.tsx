import { Link, useNavigate } from 'react-router-dom';
import { AppPagesRoute, AuthStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

function Avatar():JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {authorizationStatus} = useAppSelector((state)=>state);
  const logoutHandler = () => {
    dispatch(logoutAction());
  };
  return(
    <ul className="user-block">
      <li className="user-block__item" onClick={()=>navigate('/mylist')}>
        <div className="user-block__avatar">
          <img src={authorizationStatus === AuthStatus.Auth ? 'img/avatar.jpg' : 'img/guest.jpg'} alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        {authorizationStatus === AuthStatus.Auth ?
          <Link className="user-block__link" to={AppPagesRoute.Main} onClick={logoutHandler}>Sign out</Link>
          : <Link className="user-block__link" to={AppPagesRoute.SignIn}>Sign in</Link>}
      </li>
    </ul>
  );
}

export default Avatar;
