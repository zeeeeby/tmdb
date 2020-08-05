import React from 'react'
import { movies } from '@src/store/modules/movies'
import { Page } from './_base/page'
import { Typography } from '@material-ui/core'
import { FilterPanel } from '@src/components/FilterPanel'

export const Popular: React.FC = () => {
  const { getPopularMovies } = movies.useActions()
  return (
    <>
      <Typography variant="button" component="h6">
        Popular movies
      </Typography>
      <Page content={movies.usePopular()} getter={getPopularMovies} />{' '}
    </>
  )
}
