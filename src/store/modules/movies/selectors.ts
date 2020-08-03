import { AppStateType } from '@src/store'

export const getDetails = (state: AppStateType) => state.movies.currentMovie
export const getSimilar = (state: AppStateType) => state.movies.similar
export const getRecommendations = (state: AppStateType) =>
  state.movies.recommendations

export const getPopular = (state: AppStateType) => state.movies.popular
export const getNowPlaying = (state: AppStateType) => state.movies.nowPlaying
export const getTopRated = (state: AppStateType) => state.movies.topRated
export const getUpcoming = (state: AppStateType) => state.movies.upcoming
export const getDiscovered = (state: AppStateType) => state.movies.discovered
