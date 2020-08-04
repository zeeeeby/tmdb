import React from 'react'
import { tv } from '@src/store/modules/tv'
import { Page } from './_base/page'

export const Recommendations: React.FC = () => {
  const { getPopularTV } = tv.useActions()
  return <Page content={tv.usePopular()} getter={getPopularTV} withURLParam/>
}