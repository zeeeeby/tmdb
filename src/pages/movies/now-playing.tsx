import React from 'react'
import { movies } from '@src/store/modules/movies'
import { Page } from '../_base/baseMovies'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

export const NowPlaying: React.FC = () => {
  const { getNowPlayingMovies } = movies.useActions()
  const [t] = useTranslation()
  return (
    <>
      <Typography variant="button" component="h6">
        {t('now-playing movies') + ' ' + t('movies')}
      </Typography>
      <Page content={movies.useNowPlaying()} getter={getNowPlayingMovies} />
    </>
  )
}
