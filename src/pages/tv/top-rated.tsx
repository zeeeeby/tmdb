import React from 'react'
import { tv } from '@src/store/modules/tv'
import { Page } from '../_base/baseTV'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

export const TopRated: React.FC = () => {
  const { getTopRatedTV } = tv.useActions()
  const [t] = useTranslation()
  return (
    <>
      <Typography variant="button" component="h6">
        {t('top-rated tv') + ' ' + t('tv')}
      </Typography>
      <Page content={tv.useTopRated()} getter={getTopRatedTV} />
    </>
  )
}
