import React from 'react'
import { movies } from '@src/store/modules/movies'
import { Page } from './_base/page'

export const TopRated: React.FC = () => {
  const { getTopRatedMovies } = movies.useActions()
  return <Page content={movies.useTopRated()} getter={getTopRatedMovies} />
}
