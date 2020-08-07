import React from 'react'
import { tv } from '@src/store/modules/tv'
import { Page } from '../_base/baseTV'
import { Typography } from '@material-ui/core'

export const AiringToday: React.FC = () => {
  const { getAiringTodayTV } = tv.useActions()
  return (
    <>
      <Typography variant="button" component="h6">
        Airing today TV
      </Typography>
      <Page content={tv.useAiringToday()} getter={getAiringTodayTV} />
    </>
  )
}
