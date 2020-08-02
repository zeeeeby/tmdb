import React from 'react'
import { movies } from '@src/store/modules/movies'
import { Page } from './_base/page'

export const NowPlaying: React.FC = () => {
  const { getNowPlayingMovies } = movies.useActions()
  return <Page content={movies.useNowPlaying()} getter={getNowPlayingMovies} />
}
