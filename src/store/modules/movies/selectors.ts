import { AppStateType } from '@src/store'

export const getDetails = (state: AppStateType) =>
  state.movies.currentMovie.details
export const getSimilar = (state: AppStateType) =>
  state.movies.currentMovie.similar
export const getRecommendations = (state: AppStateType) =>
  state.movies.currentMovie.recommendations
export const getVideos = (state: AppStateType) =>
  state.movies.currentMovie.videos
export const getExternalIds = (state: AppStateType) =>
  state.movies.currentMovie.externalIds

export const getPopular = (state: AppStateType) => state.movies.popular
export const getNowPlaying = (state: AppStateType) => state.movies.nowPlaying
export const getTopRated = (state: AppStateType) => state.movies.topRated
export const getUpcoming = (state: AppStateType) => state.movies.upcoming
