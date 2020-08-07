import React from 'react'
import { tv } from '@src/store/modules/tv'
import { Page } from '../_base/baseTV'
import { Typography } from '@material-ui/core'

export const Popular: React.FC = () => {
  const { getPopularTV } = tv.useActions()
  return (
    <>
      <Typography variant="button" component="h6">
        Popular TV
      </Typography>
      <Page content={tv.usePopular()} getter={getPopularTV} />
    </>
  )
}
