import React from 'react'
import { tv } from '@src/store/modules/tv'
import { Page } from '../_base/baseTV'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

export const Popular: React.FC = () => {
  const { getPopularTV } = tv.useActions()
  const [t] = useTranslation()
  return (
    <>
      <Typography variant="button" component="h6">
        {t('popular tv') + ' ' + t('tv')}
      </Typography>
      <Page content={tv.usePopular()} getter={getPopularTV} />
    </>
  )
}
