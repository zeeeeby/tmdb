import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { CardsList } from '@src/components/CardsList'

import { movies } from '@src/store/modules/movies'
import { tv } from '@src/store/modules/tv'
import { MovieCard } from '@src/components/CardsList/MovieCard'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { TVCard } from '@src/components/CardsList/TVCard'

const useStyles = makeStyles({
  pagination: {
    '& ul': { justifyContent: 'center', margin: '10px 0' },
  },
  slider: {
    overflowX: 'auto',
    marginBottom: '15px',
    minWidth: '100%',
  },
})

export const Home: React.FC = () => {
  const classes = useStyles()
  const popularMovies = movies.usePopular()
  const popularTTV = tv.usePopular()

  const { getPopularMovies } = movies.useActions()
  const { getPopularTV } = tv.useActions()
  React.useEffect(() => {
    getPopularMovies(1)
    getPopularTV(1)
  }, [])
  return (
    <>
      <Typography
        style={{ textAlign: 'center' }}
        variant="button"
        component="h6"
      >
        <Link to={'/movies'}>Популярные фильмы</Link>
      </Typography>
      <div className={classes.slider}>
        <CardsList style={{ flexWrap: 'nowrap' }}>
          {popularMovies.data?.results?.map((el) => (
            <MovieCard
              isLoading={popularMovies.isLoading}
              key={el.id}
              card={el}
            />
          ))}
        </CardsList>
      </div>
      <Typography
        style={{ textAlign: 'center' }}
        variant="button"
        component="h6"
      >
        <Link to={'/tv'}>Популярные сериалы</Link>
      </Typography>
      <div className={classes.slider}>
        <CardsList style={{ flexWrap: 'nowrap' }}>
          {popularTTV.data?.results?.map((el) => (
            <TVCard isLoading={popularTTV.isLoading} key={el.id} card={el} />
          ))}
        </CardsList>
      </div>
    </>
  )
}
