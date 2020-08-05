import React from 'react'
import { movies } from '@src/store/modules/movies'
import { Page } from './_base/page'
import { Typography } from '@material-ui/core'

export const TopRated: React.FC = () => {
  const { getTopRatedMovies } = movies.useActions()
  return (
    <>
      <Typography variant="button" component="h6">
        Top rated movies
      </Typography>
      <Page content={movies.useTopRated()} getter={getTopRatedMovies} />{' '}
    </>
  )
}
