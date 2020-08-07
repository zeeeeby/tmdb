import React from 'react'
import { movies } from '@src/store/modules/movies'
import { Page } from '../../_base/baseMovies'

export const FavoriteList: React.FC = () => {
  const { getFavoriteList } = movies.useActions()
  return <Page content={movies.useFavoriteList()} getter={getFavoriteList} />
}
