import React from 'react'
import { movies } from '@src/store/modules/movies'
import { Page } from '../_base/baseMovies'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

export const TopRated: React.FC = () => {
  const { getTopRatedMovies } = movies.useActions()
  const [t] = useTranslation()
  return (
    <>
      <Typography variant="button" component="h6">
        {t('top-rated movies') + ' ' + t('movies')}
      </Typography>
      <Page content={movies.useTopRated()} getter={getTopRatedMovies} />
    </>
  )
}
