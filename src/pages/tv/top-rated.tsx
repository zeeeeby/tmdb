import React from 'react'
import { tv } from '@src/store/modules/tv'
import { Page } from './_base/page'

export const TopRated: React.FC = () => {
  const { getTopRatedTV } = tv.useActions()
  return <Page content={tv.useTopRated()} getter={getTopRatedTV} />
}
