import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { CardsList } from '@src/components/CardsList'
import { useRouteMatch, Link, useHistory } from 'react-router-dom'
import { movies } from '@src/store/modules/movies'

import { Typography, Grid, Box } from '@material-ui/core'
import { getImageLink } from '@src/api'
import Rating from '@material-ui/lab/Rating'
import Skeleton from '@material-ui/lab/Skeleton'

import { Expand } from '@src/components/Expand'
import { MovieCard } from '@src/components/CardsList/MovieCard'
import { CardSlider } from '@src/components/CardSlider'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
  pagination: {
    '& ul': { justifyContent: 'center', margin: '10px 0' },
  },
  header: {
    backgroundPosition: 'right 0 top',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '500px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'end',
  },
  containerImage: {
    textAlign: 'center',
  },
  containerExternalLinks: {
    display: 'flex',
    '& svg': {
      fontSize: '2.25rem',
    },
  },
  image: {
    width: '80%',
  },
  imageSkeleton: {
    height: '100%',
    width: '70%',
  },
  slider: {
    overflowX: 'auto',
    marginBottom: '15px',
    minWidth: '100%',
  },
  details: {
    color: 'white',
    display: 'flex',
  },
  zidx: {
    position: 'relative',
    zIndex: 1,
  },
  grid: {
    flexShrink: 0,
  },
  root: {
    width: '100%',
    height: '100%',
  },
  genresLink: {
    padding: '2px',
    '&:hover': {
      backgroundColor: 'primary',
    },
  },
  videoWrapper: {
    position: 'relative',
    paddingTop: ' 56.25%', //16:9
    height: 0,
    '& iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  },
})
export const ByID: React.FC = () => {
  const DESCRIPTION_BREAKPOINT = 25
  const history = useHistory()
  const classes = useStyles()
  const { useDetails } = movies.currentMovie
  const { useRecommendations, useSimilar } = movies
  const details = useDetails()
  const videos = details.data?.videos

  const detailsOverview = details.data?.overview?.split(' ') || []

  const recommendations = useRecommendations()
  const similar = useSimilar()

  const matchedParams = useRouteMatch().params as { id: string }

  let movieID = parseInt(matchedParams.id || '1')

  const {
    getMovieDetails,
    getRecommendations,
    getSimilarMovies,
  } = movies.useActions()

  const [t, i18n] = useTranslation()
  
  React.useEffect(() => {
    getMovieDetails(movieID)
    getRecommendations(movieID, 1)
    getSimilarMovies(movieID, 1)
  }, [movieID, i18n.language])
  if (details.error?.status === 404) history.push('/404')
  return (
    <>
      <Grid alignItems="stretch" container spacing={2}>
        <Grid className={classes.zidx} item xs={12} sm={3}>
          {!details.isLoading ? (
            <div className={classes.container}>
              <div className={classes.containerImage}>
                <img
                  className={classes.image}
                  src={getImageLink(details.data?.poster_path)}
                  alt="poster"
                />
              </div>
            </div>
          ) : (
            <div className={classes.container}>
              <Skeleton
                className={classes.imageSkeleton}
                animation="wave"
                variant="rect"
              ></Skeleton>
            </div>
          )}
        </Grid>
        <Grid className={classes.zidx} item xs={12} sm={9}>
          <Typography variant="h4" component="h4">
            {!details.isLoading ? (
              `${details.data?.title}(${
                details?.data?.release_date
                  ? new Date(details?.data?.release_date).getFullYear()
                  : 'N/A'
              })`
            ) : (
              <Skeleton animation="wave" variant="text" />
            )}
          </Typography>
          <Typography variant="h6" component="h4">
            {!details.isLoading ? (
              `${details.data?.original_title}`
            ) : (
              <Skeleton animation="wave" variant="text" />
            )}
          </Typography>
          {!details.isLoading ? (
            <Grid
              style={{ display: 'flex', alignItems: 'center' }}
              item
              xs={12}
            >
              <Rating
                max={10}
                size="medium"
                name="read-only"
                value={details?.data?.vote_average}
                readOnly
              />
              <Box>{details?.data?.vote_average}</Box>
            </Grid>
          ) : (
            <Skeleton animation="wave" variant="text" />
          )}
          <Grid container>
            <Grid style={{ marginTop: '15px' }} item xs={12}>
              <Typography
                style={{ marginBottom: '10px' }}
                variant="h5"
                component="h5"
              >
                {t('details info').toUpperCase()}
              </Typography>
              {!details.isLoading ? (
                <>
                  {details.data?.status && (
                    <Typography variant="body1" component="h6">
                      {t('details status')}:{details.data?.status}
                    </Typography>
                  )}
                  {details.data?.release_date && (
                    <Typography variant="body1" component="h6">
                      {t('details release date')}:{' '}
                      {new Date(
                        details?.data?.release_date
                      ).toLocaleDateString()}
                    </Typography>
                  )}
                  {details.data?.runtime && (
                    <Typography variant="body1" component="h6">
                      {t('details duration')}:
                      {` ${Math.trunc(details.data?.runtime / 60)} ${t(
                        'details hours'
                      )} ${details.data?.runtime % 60} ${t('details minutes')}`}
                    </Typography>
                  )}
                  {details.data?.tagline && (
                    <Typography variant="body1" component="h6">
                      {t('details tag')}: {' ' + details.data?.tagline}
                    </Typography>
                  )}
                  {Number.isInteger(details.data!.budget) && (
                    <Typography variant="body1" component="h6">
                      {t('details budget')}: {details.data?.budget + '$'}
                    </Typography>
                  )}
                  {details.data?.genres?.length ? (
                    <Typography variant="body1" component="h6">
                      {t('details genres')}:
                      {details.data?.genres.map((el, idx) => (
                        <Link
                          className={classes.genresLink}
                          key={el.id}
                          to={'genres/' + el.id}
                        >
                          {el.name + ' '}
                        </Link>
                      ))}
                    </Typography>
                  ) : null}
                </>
              ) : (
                <Skeleton
                  style={{ height: '150px' }}
                  animation="wave"
                  variant="rect"
                />
              )}

              <Typography variant="body1" component="h6"></Typography>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: '15px' }} item xs={12}>
            {!details.isLoading ? (
              <>
                <Typography
                  style={{ marginBottom: '10px' }}
                  variant="h5"
                  component="h5"
                >
                  {t('details description').toUpperCase()}
                </Typography>
                {details.data?.overview && (
                  <div>
                    <Typography variant="body1" component="h6">
                      {detailsOverview
                        ?.slice(0, DESCRIPTION_BREAKPOINT)
                        .join(' ')}
                    </Typography>
                    {detailsOverview?.length - DESCRIPTION_BREAKPOINT > 0 && (
                      <Expand>
                        <Typography variant="body1" component="h6">
                          {detailsOverview
                            ?.slice(DESCRIPTION_BREAKPOINT)
                            .join(' ')}
                        </Typography>
                      </Expand>
                    )}
                  </div>
                )}
              </>
            ) : (
              <Skeleton
                style={{ height: '50px' }}
                animation="wave"
                variant="rect"
              />
            )}
          </Grid>
        </Grid>
        {!details.isLoading ? (
          <>
            {videos?.results.length > 0 && (
              <>
                <Typography variant="button" component="h6">
                  {t('details video').toUpperCase()}
                </Typography>
                <Grid
                  container
                  className={classes.slider}
                  style={{ flexWrap: 'nowrap', overflowY: 'hidden' }}
                >
                  {videos?.results?.map((el) => (
                    <Grid
                      style={{ flexShrink: 0 }}
                      xs={12}
                      sm={4}
                      md={3}
                      lg={3}
                      key={el.key}
                    >
                      <div className={classes.videoWrapper}>
                        <iframe
                          frameBorder="0"
                          allowFullScreen
                          src={`https://www.youtube.com/embed/${el.key}`}
                          title={el.name}
                        ></iframe>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </>
        ) : null}
        {!recommendations.isLoading ? (
          <>
            {recommendations.data.total_results > 0 && (
              <>
                <Typography variant="button" component="h6">
                  {t('details recommend')}{' '}
                  <Link to={'recommendations/' + details.data?.id}>
                    {t('details show all')}
                  </Link>
                </Typography>
                <CardSlider>
                  {recommendations.data?.results?.map((el) => (
                    <MovieCard
                      isLoading={recommendations.isLoading}
                      key={el.id}
                      card={el}
                    />
                  ))}
                </CardSlider>
              </>
            )}
          </>
        ) : null}

        {!similar.isLoading ? (
          <>
            {similar.data.total_results > 0 && (
              <>
                <Typography variant="button" component="h6">
                  Схожие фильмы{' '}
                  <Link to={'similar/' + details.data?.id}>
                    {t('details show all')}
                  </Link>
                </Typography>
                <CardSlider>
                  {similar.data.results?.map((el) => (
                    <MovieCard
                      isLoading={similar.isLoading}
                      key={el.id}
                      card={el}
                    />
                  ))}
                </CardSlider>
              </>
            )}
          </>
        ) : null}
      </Grid>
    </>
  )
}
