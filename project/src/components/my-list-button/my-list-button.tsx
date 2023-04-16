import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilmStatusAction } from '../../store/api-actions';
import { AppRoute } from '../../const';

type MyListBtnProps = {
  isAuthorized: boolean;
  isFavorite: boolean;
  filmsCount: number;
  filmId: string;
}

export default function MyListButton({isAuthorized, isFavorite, filmsCount, filmId}: MyListBtnProps) : JSX.Element {

  const dispatch = useAppDispatch();
  const newStatus = isFavorite ? 0 : 1;
  const promoId = useAppSelector((state) => state.promoFilm.id);

  const navigate = useNavigate();

  const onClickHandler = () => {
    if (isAuthorized) {
      dispatch(setFilmStatusAction({filmId, status: newStatus, isPromo: `${promoId}` === filmId}));
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={onClickHandler}
    >
      {
        isAuthorized ?
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref={isFavorite ? '#in-list' : '#add'}></use>
          </svg> : ''
      }
      <span style={{marginLeft: !isAuthorized ? '10px' : ''}}>My list</span>
      <span className={`film-card__count ${!isAuthorized ? 'visually-hidden' : ''}`}>{filmsCount}</span>
    </button>
  );
}
