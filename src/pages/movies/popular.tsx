import React from 'react'
import { movies } from '@src/store/modules/movies'
import { Page } from '../_base/baseMovies'
import { Typography } from '@material-ui/core'
import { FilterPanel } from '@src/components/FilterPanel'
import { useTranslation } from 'react-i18next'

export const Popular: React.FC = () => {
  const { getPopularMovies } = movies.useActions()
  const [t] = useTranslation()
  return (
    <>
      <Typography variant="button" component="h6">
        {t('popular movies') + ' ' + t('movies')}
      </Typography>
      <Page content={movies.usePopular()} getter={getPopularMovies} />
    </>
  )
}
