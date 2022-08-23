import { Link } from 'react-router-dom';
import { AppPagesRoute } from '../../const';

type LogoProps = {
    logoLight?: boolean;
}

function Logo({logoLight = false}: LogoProps):JSX.Element {
  return(
    <div className="logo">
      <Link to={AppPagesRoute.Main} className={logoLight ? 'logo__link logo__link--light' : 'logo__link'}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );

}

export default Logo;
