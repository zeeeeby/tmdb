import React from 'react'
import { tv } from '@src/store/modules/tv'
import { Page } from '../_base/baseTV'
import { Typography } from '@material-ui/core'

export const TopRated: React.FC = () => {
  const { getTopRatedTV } = tv.useActions()
  return (
    <>
      <Typography variant="button" component="h6">
        Top rated TV
      </Typography>
      <Page content={tv.useTopRated()} getter={getTopRatedTV} />
    </>
  )
}
