import React from 'react'
import { movies } from '@src/store/modules/movies'
import { Page } from './_base/page'
import { Typography } from '@material-ui/core'

export const Upcoming: React.FC = () => {
  const upcoming = movies.useUpcoming()
  const { getUpcomingMovies } = movies.useActions()
  return (
    <>
      <Typography variant="button" component="h6">
        Upcoming movies
      </Typography>
      <Page content={upcoming} getter={getUpcomingMovies} />{' '}
    </>
  )
}
