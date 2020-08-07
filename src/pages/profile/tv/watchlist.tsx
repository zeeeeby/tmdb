import React from 'react'
import { tv } from '@src/store/modules/tv'
import { Page } from '../../_base/baseTV'

export const WatchList: React.FC = () => {
  const { getWatchList } = tv.useActions()
  return <Page content={tv.useWatchList()} getter={getWatchList} />
}
