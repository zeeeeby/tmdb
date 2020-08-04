import React from 'react'
import { tv } from '@src/store/modules/tv'
import { Page } from './_base/page'

export const AiringToday: React.FC = () => {
  const { getAiringTodayTV } = tv.useActions()
  return <Page content={tv.useAiringToday()} getter={getAiringTodayTV} />
}
