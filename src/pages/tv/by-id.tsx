import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { CardsList } from '@src/components/CardsList'
import { useRouteMatch, Link } from 'react-router-dom'
import { tv } from '@src/store/modules/tv'

import { Typography, Grid, Box } from '@material-ui/core'
import { getImageLink } from '@src/api'
import Rating from '@material-ui/lab/Rating'
import Skeleton from '@material-ui/lab/Skeleton'

import { Expand } from '@src/components/common/expand'
import { TVCard } from '@src/components/CardsList/TVCard'
import { TVSeasonCard } from '@src/components/CardsList/TVSeasonCard'

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
    alignItems: 'end',
    height: '100%',
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

  const classes = useStyles()
  const { useDetails } = tv.currentTV
  const { useRecommendations, useSimilar } = tv
  const details = useDetails()
  const videos = details.data?.videos
  const detailsOverview = details.data?.overview?.split(' ') || []
  const recommendations = useRecommendations()
  const similar = useSimilar()

  const matchedParams = useRouteMatch().params as { id: string }

  let tvID = parseInt(matchedParams.id || '1')

  const { getTVDetails, getRecommendations, getSimilarTV } = tv.useActions()

  React.useEffect(() => {
    //@ts-ignore
    getTVDetails(tvID)
    getRecommendations(tvID, 1)
    getSimilarTV(tvID, 1)
    //TODO: Redurect to 404
  }, [tvID])

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
              {/* <div className={classes.containerExternalLinks}>
                {externalIds &&
                  getExternalLinks(externalIds).map((el) => (
                    <Typography variant="body1" component="h6">
                      {el}
                    </Typography>
                  ))}
              </div> */}
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
              `${details.data?.name}(${
                details.data?.first_air_date
                  ? new Date(details.data?.first_air_date).getFullYear()
                  : 'N/A'
              })`
            ) : (
              <Skeleton animation="wave" variant="text" />
            )}
          </Typography>
          <Typography variant="h6" component="h4">
            {details.data?.original_name ? (
              `${details.data?.original_name}`
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
                value={details.data?.vote_average}
                readOnly
              />
              <Box>{details.data?.vote_average}</Box>
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
                ИНФОРМАЦИЯ
              </Typography>
              {!details.isLoading ? (
                <>
                  {details.data?.status && (
                    <Typography variant="body1" component="h6">
                      Статус:
                      {details.data?.status}
                    </Typography>
                  )}
                  {details.data?.first_air_date && (
                    <Typography variant="body1" component="h6">
                      Дата выхода:{' '}
                      {new Date(
                        details.data?.first_air_date
                      ).toLocaleDateString()}
                    </Typography>
                  )}
                  {details.data?.episode_run_time && (
                    <Typography variant="body1" component="h6">
                      Длительность эпизода:
                      {` ${Math.trunc(
                        details.data?.episode_run_time.reduce(
                          (acc, el) => acc + el,
                          0
                        ) / details.data?.episode_run_time.length
                      )} мин`}
                    </Typography>
                  )}
                  {details.data?.number_of_episodes && (
                    <Typography variant="body1" component="h6">
                      Эпизодов: {' ' + details.data?.number_of_episodes}
                    </Typography>
                  )}
                  {details.data?.number_of_seasons && (
                    <Typography variant="body1" component="h6">
                      Сезонов: {' ' + details.data?.number_of_seasons}
                    </Typography>
                  )}

                  {details.data?.genres && details.data?.genres.length > 0 && (
                    <Typography variant="body1" component="h6">
                      Жанры:
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
                  )}
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
                  ОПИСАНИЕ
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
        {videos?.results?.length ? (
          <>
            <Typography variant="button" component="h6">
              ВИДЕО
            </Typography>
            <Grid
              container
              className={classes.slider}
              style={{ flexWrap: 'nowrap', overflowY: 'hidden' }}
            >
              {videos?.results?.map((el) => (
                <Grid style={{ flexShrink: 0 }} xs={12} sm={4} md={3} lg={3}>
                  <div className={classes.videoWrapper}>
                    <iframe
                      frameBorder="0"
                      allowFullScreen
                      key={el.key}
                      src={`https://www.youtube.com/embed/${el.key}`}
                      title={el.name}
                    ></iframe>
                  </div>
                </Grid>
              ))}
            </Grid>
          </>
        ) : null}
        {details.data?.seasons ? (
          <>
            <Typography variant="button" component="h6">
              Сезоны{' '}
            </Typography>
            <div className={classes.slider}>
              <CardsList style={{ flexWrap: 'nowrap' }}>
                {details.data?.seasons.map((el) => (
                  <TVSeasonCard
                    isLoading={details.isLoading}
                    card={el}
                    key={el.id}
                  >
                    {
                      ' Сезон!'
                      //create season card
                    }
                  </TVSeasonCard>
                ))}
              </CardsList>
            </div>
          </>
        ) : null}

        {recommendations?.data?.total_results ? (
          <>
            <Typography variant="button" component="h6">
              Рекомендации{' '}
              <Link to={'recommendations/' + details.data?.id}>
                посмотреть все
              </Link>
            </Typography>
            <div className={classes.slider}>
              <CardsList style={{ flexWrap: 'nowrap' }}>
                {recommendations?.data?.results?.map((el) => (
                  <TVCard
                    isLoading={recommendations.isLoading}
                    key={el.id}
                    card={el}
                  />
                ))}
              </CardsList>
            </div>
          </>
        ) : null}

        {similar.data?.total_results ? (
          <>
            <Typography variant="button" component="h6">
              Схожие сериалы{' '}
              <Link to={'similar/' + details.data?.id}>посмотреть все</Link>
            </Typography>
            <div className={classes.slider}>
              <CardsList style={{ flexWrap: 'nowrap' }}>
                {similar.data?.results.map((el) => (
                  <TVCard isLoading={similar.isLoading} key={el.id} card={el} />
                ))}
              </CardsList>
            </div>
          </>
        ) : null}
      </Grid>
    </>
  )
}
