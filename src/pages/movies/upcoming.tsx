import React from 'react'
import { movies } from '@src/store/modules/movies'
import { Page } from './_base/page'

export const Upcoming: React.FC = () => {
  const upcoming = movies.useUpcoming()
  const { getUpcomingMovies } = movies.useActions()
  return <Page content={upcoming} getter={getUpcomingMovies} />
}
