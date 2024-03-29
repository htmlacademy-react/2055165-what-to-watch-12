import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import PlayerButton from '../../components/player-button/player-button';
import { AuthorizationStatus, CLASSPATH_LOGO_FOOTER, CLASSPATH_LOGO_HEADER, tabNames } from '../../const';
import Tabs from '../../components/tabs/tabs';
import NotFoundPage from '../not-found-page/not-found-page';
import TabsNavigation from '../../components/tabs-navigation/tabs-navigation';
import FilmsList from '../../components/film-list/film-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import UserBlock from '../../components/user-block/user-block';
import GuestBlock from '../../components/guest-block/guest-block';
import { Fragment, useEffect } from 'react';
import { fetchFilmAction, fetchReviewsAction, fetchSimilarFilmsAction } from '../../store/api-actions';
import { getRandomFilms } from '../../utils/utils';
import MyListButton from '../../components/my-list-button/my-list-button';
import AddReviewButton from '../../components/add-review-button/add-review-button';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { getCurrentFilm, getFilmReviews, getFilmsLoadingStatus, getSimilarFilms, getNetworkError } from '../../store/app-data/app-data-selectors';
import ErrorScreen from '../../components/error-components/error-screen/error-screen';
import LoadingScreen from '../../components/loading-components/loading-screen/loading-screen';

type MoviePageProps = {
  activeTab: typeof tabNames[number];
}

const SIMILAR_FILMS_COUNT = 4;

export default function MoviePage({ activeTab }: MoviePageProps): JSX.Element {

  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted && id) {
      dispatch(fetchFilmAction(id));
    }

    return () => { isMounted = false; };
  }, [id, dispatch]);

  const film = useAppSelector(getCurrentFilm);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && id && film) {
      dispatch(fetchReviewsAction(id));
      dispatch(fetchSimilarFilmsAction(id));
    }

    return () => { isMounted = false; };
  }, [id, dispatch, film]);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isFilmsLoading = useAppSelector(getFilmsLoadingStatus);

  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const isNetworkError = useAppSelector(getNetworkError);

  const reviews = useAppSelector(getFilmReviews);
  const similarFilmsList = useAppSelector(getSimilarFilms);

  const similarFilms = getRandomFilms(similarFilmsList, SIMILAR_FILMS_COUNT);

  if (film === undefined || isFilmsLoading) {
    return <LoadingScreen />;
  }

  if (film === null || !id) {
    if (isNetworkError) {
      return <ErrorScreen />;
    }
    return <NotFoundPage />;
  }

  const {
    name,
    posterImage,
    backgroundImage,
    genre,
    released,
    backgroundColor,
    isFavorite
  } = film;

  return (
    <Fragment>
      <Helmet>
        <title>What to Watch. Описание фильма</title>
      </Helmet>
      <section className="film-card film-card--full" style={{ backgroundColor: `${backgroundColor}` }}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} data-testid="moviepage-bgimage" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo classPath={CLASSPATH_LOGO_HEADER} />
            {
              isAuthorized
                ? <UserBlock />
                : <GuestBlock />
            }
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title" data-testid="moviepage-title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre" data-testid="moviepage-genre">{genre}</span>
                <span className="film-card__year" data-testid="moviepage-year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayerButton filmId={id} />
                <MyListButton isAuthorized={isAuthorized} isFavorite={isFavorite} filmId={id} />
                {isAuthorized ? <AddReviewButton filmId={id} /> : ''}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <TabsNavigation activeTab={activeTab} id={id} />
              <Tabs activeTab={activeTab} film={film} reviewsList={reviews} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList filmsList={similarFilms} />
        </section>

        <footer className="page-footer">
          <Logo classPath={CLASSPATH_LOGO_FOOTER} />

          <div className="copyright">
            <p>© 2023 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </Fragment>
  );
}

