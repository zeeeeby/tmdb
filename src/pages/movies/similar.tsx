import React from 'react'
import { movies } from '@src/store/modules/movies'
import { Page } from './_base/page'

export const Similar: React.FC = () => {
  const { getSimilarMovies } = movies.useActions()
  return (
    <Page
      content={movies.currentMovie.useSimilar()}
      getter={getSimilarMovies}
      withURLParam
    />
  )
}
