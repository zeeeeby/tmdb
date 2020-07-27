import { AppStateType } from '@src/store'

export const getMovieDetails = (state: AppStateType) =>
  state.movies.currentMovie.details
export const getSimilarMovies = (state: AppStateType) =>
  state.movies.currentMovie.similar
export const getRecommendations = (state: AppStateType) =>
  state.movies.currentMovie.recommendations
export const getVideos = (state: AppStateType) =>
  state.movies.currentMovie.videos
  
export const getPopularMovies = (state: AppStateType) =>
  state.movies.popularMovies
export const getNowPlayingMovies = (state: AppStateType) =>
  state.movies.nowPlayingMovies
export const getTopRatedMovies = (state: AppStateType) =>
  state.movies.topRatedMovies
export const getUpcomingMovies = (state: AppStateType) =>
  state.movies.upcomingMovies
