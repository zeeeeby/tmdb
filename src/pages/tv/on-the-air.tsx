import React from 'react'
import { tv } from '@src/store/modules/tv'
import { Page } from '../_base/baseTV'
import { Typography } from '@material-ui/core'

export const OnTheAir: React.FC = () => {
  const { getOnTheAirTV } = tv.useActions()
  return (
    <>
      <Typography variant="button" component="h6">
        On the air TV
      </Typography>
      <Page content={tv.useOnTheAir()} getter={getOnTheAirTV} />
    </>
  )
}
