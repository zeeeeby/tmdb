import React from 'react'
import { tv } from '@src/store/modules/tv'
import { Page } from '../../_base/baseTV'

export const FavoriteList: React.FC = () => {
  const { getFavoriteList } = tv.useActions()
  return <Page content={tv.useFavoriteList()} getter={getFavoriteList} />
}
