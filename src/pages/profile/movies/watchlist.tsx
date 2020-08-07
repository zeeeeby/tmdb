import React from 'react'
import { movies } from '@src/store/modules/movies'
import { Page } from '../../_base/baseMovies'

export const WatchList: React.FC = () => {
  const { getWatchList } = movies.useActions()
  return <Page content={movies.useWatchList()} getter={getWatchList} />
}
