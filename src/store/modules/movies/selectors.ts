import { AppStateType } from '@src/store'

export const getDetails = (state: AppStateType) =>
  state.movies.currentMovie.details
export const getSimilar = (state: AppStateType) =>
  state.movies.currentMovie.similar
export const getRecommendations = (state: AppStateType) =>
  state.movies.currentMovie.recommendations
export const getVideos = (state: AppStateType) =>
  state.movies.currentMovie.videos
  
export const getPopular = (state: AppStateType) =>
  state.movies.popularMovies
export const getNowPlaying = (state: AppStateType) =>
  state.movies.nowPlayingMovies
export const getTopRated = (state: AppStateType) =>
  state.movies.topRatedMovies
export const getUpcoming = (state: AppStateType) =>
  state.movies.upcomingMovies
