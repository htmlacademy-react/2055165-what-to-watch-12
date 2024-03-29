import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { resetFilterGenreAction, resetFilmsCountOnPageAction } from '../../store/main-process/main-process';

type LogoProps = {
  classPath: string;
}

export default function Logo({ classPath }: LogoProps): JSX.Element {

  const dispatch = useAppDispatch();

  const handleLogoClick = () => {
    dispatch(resetFilterGenreAction());
    dispatch(resetFilmsCountOnPageAction());
  };

  return (
    <div className="logo" onClick={handleLogoClick} data-testid='logo'>
      <Link to={AppRoute.Main} className={classPath}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}
