import React from 'react'
import { movies } from '@src/store/modules/movies'
import { Page } from './_base/page'

export const Popular: React.FC = () => {
  const { getPopularMovies } = movies.useActions()
  return <Page content={movies.usePopular()} getter={getPopularMovies} />
}
