import React from 'react'
import { movies } from '@src/store/modules/movies'
import { Page } from '../_base/baseMovies'
import { Typography } from '@material-ui/core'

export const NowPlaying: React.FC = () => {
  const { getNowPlayingMovies } = movies.useActions()
  return (
    <>
      <Typography variant="button" component="h6">
        Now playing movies
      </Typography>
      <Page content={movies.useNowPlaying()} getter={getNowPlayingMovies} />
    </>
  )
}
