import React from 'react'
import { tv } from '@src/store/modules/tv'
import { Page } from '../_base/baseTV'

export const Similar: React.FC = () => {
  const { getSimilarTV } = tv.useActions()
  return <Page content={tv.useSimilar()} getter={getSimilarTV} withURLParam />
}
