import { InferActionsTypes, BaseThunkType } from '../..'
import { authApi } from '@src/api'
import { Dispatch } from 'redux'

import {
  TMovieDetails,
  TNowPlayingMovies,
  TPopularMovies,
  TTopRatedMovies,
} from './types'

type ActionsTypes = InferActionsTypes<typeof localActions>
type ThunkType = BaseThunkType<ActionsTypes>
type TInitialState = typeof initialState

let initialState = {
  movieDetails: {} as TMovieDetails,
  popularMovies: {} as TPopularMovies,
  nowPlayingMovies: {} as TNowPlayingMovies,
  topRatedMovies: {} as TTopRatedMovies,
}

export const moviesReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/movies/SET_MOVIE_DETAILS':
      return {
        ...state,
        movieDetails: action.payload.details,
      }
    case 'tmdb/movies/SET_POPULAR_MOVIES':
      return {
        ...state,
        popularMovies: action.payload.movies,
      }
    case 'tmdb/movies/SET_NOW_PLAYING_MOVIES':
      return { ...state, nowPlayingMovies: action.payload.movies }
    case 'tmdb/movies/SET_TOP_RATED_MOVIES':
      return { ...state, topRatedMovies: action.payload.movies }
    default:
      return state
  }
}

const localActions = {
  setMovieDetails: (details: TMovieDetails) =>
    ({
      type: 'tmdb/movies/SET_MOVIE_DETAILS',
      payload: { details },
    } as const),
  setPopularMovies: (movies: TPopularMovies) =>
    ({
      type: 'tmdb/movies/SET_POPULAR_MOVIES',
      payload: { movies },
    } as const),
  setNowPlayingMovies: (movies: TNowPlayingMovies) =>
    ({
      type: 'tmdb/movies/SET_NOW_PLAYING_MOVIES',
      payload: { movies },
    } as const),
  setTopRatedMovies: (movies: TNowPlayingMovies) =>
    ({
      type: 'tmdb/movies/SET_TOP_RATED_MOVIES',
      payload: { movies },
    } as const),
}
