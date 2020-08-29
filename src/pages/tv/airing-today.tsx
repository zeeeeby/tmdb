import React from 'react'
import { tv } from '@src/store/modules/tv'
import { Page } from '../_base/baseTV'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

export const AiringToday: React.FC = () => {
  const { getAiringTodayTV } = tv.useActions()
  const [t] = useTranslation()
  return (
    <>
      <Typography variant="button" component="h6">
        {t('airing-today tv') + ' ' + t('tv')}
      </Typography>
      <Page content={tv.useAiringToday()} getter={getAiringTodayTV} />
    </>
  )
}
