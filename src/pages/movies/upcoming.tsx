import React from 'react'
import { movies } from '@src/store/modules/movies'
import { Page } from '../_base/baseMovies'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

export const Upcoming: React.FC = () => {
  const { getUpcomingMovies } = movies.useActions()
  const [t] = useTranslation()
  return (
    <>
      <Typography variant="button" component="h6">
      {t('upcoming movies') + ' ' + t('movies')}
      </Typography>
      <Page content={movies.useUpcoming()} getter={getUpcomingMovies} />
    </>
  )
}
