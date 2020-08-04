import React from 'react'
import { tv } from '@src/store/modules/tv'
import { Page } from './_base/page'

export const OnTheAir: React.FC = () => {
  const { getOnTheAirTV } = tv.useActions()
  return <Page content={tv.useOnTheAir()} getter={getOnTheAirTV} />
}
