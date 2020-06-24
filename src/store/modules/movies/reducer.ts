import { InferActionsTypes, BaseThunkType } from '../..'

import { Dispatch } from 'redux'
import { moviesApi } from '@src/api'

import {
  TMovieDetails,
  TNowPlayingMovies,
  TPopularMovies,
  TTopRatedMovies,
  TSimilarMovies,
  TRecommendations,
  TUpcomingMovies,
} from './types'
import { useDispatch } from 'react-redux'

type ActionsTypes = InferActionsTypes<typeof localActions>
type ThunkType = BaseThunkType<ActionsTypes>
type TInitialState = typeof initialState

let initialState = {
  currentMovie: {
    details: {} as TMovieDetails,
    similar: {} as TSimilarMovies,
    recommendations: {} as TRecommendations,
  },
  popularMovies: {} as TPopularMovies,
  nowPlayingMovies: {} as TNowPlayingMovies,
  topRatedMovies: {} as TTopRatedMovies,
  upcomingMovies: {} as TUpcomingMovies,
}

export const moviesReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/movies/SET_MOVIE_DETAILS':
      return {
        ...state,
        currentMovie: {
          ...state.currentMovie,
          details: action.payload.details,
        },
      }
    case 'tmdb/movies/SET_SIMILAR_MOVIES':
      return {
        ...state,
        currentMovie: {
          ...state.currentMovie,
          similar: action.payload.movies,
        },
      }
    case 'tmdb/movies/SET_RECOMMENDATIONS':
      return {
        ...state,
        currentMovie: {
          ...state.currentMovie,
          recommendations: action.payload.movies,
        },
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
    case 'tmdb/movies/SET_UPCOMING_MOVIES':
      return { ...state, upcomingMovies: action.payload.movies }
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
  setTopRatedMovies: (movies: TTopRatedMovies) =>
    ({
      type: 'tmdb/movies/SET_TOP_RATED_MOVIES',
      payload: { movies },
    } as const),
  setSimilarMovies: (movies: TSimilarMovies) =>
    ({
      type: 'tmdb/movies/SET_SIMILAR_MOVIES',
      payload: { movies },
    } as const),
  setRecommendations: (movies: TRecommendations) =>
    ({
      type: 'tmdb/movies/SET_RECOMMENDATIONS',
      payload: { movies },
    } as const),
  setUpcoming: (movies: TUpcomingMovies) =>
    ({
      type: 'tmdb/movies/SET_UPCOMING_MOVIES',
      payload: { movies },
    } as const),
}

const getMovieDetails = (movie_id: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setMovieDetails(await moviesApi.getDetails(movie_id)))
  } catch (error) {
    throw error.response
  }
}
const getPopularMovies = (
  language?: string,
  page?: number,
  region?: string
): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    dispatch(
      localActions.setPopularMovies(
        await moviesApi.getPopular(language, page, region)
      )
    )
  } catch (error) {
    throw error.response
  }
}
const getNowPlayingMovies = (
  language?: string,
  page?: number,
  region?: string
): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    dispatch(
      localActions.setNowPlayingMovies(
        await moviesApi.getNowPlaying(language, page, region)
      )
    )
  } catch (error) {
    throw error.response
  }
}
const getTopRatedMovies = (
  language?: string,
  page?: number,
  region?: string
): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    dispatch(
      localActions.setTopRatedMovies(
        await moviesApi.getTopRated(language, page, region)
      )
    )
  } catch (error) {
    throw error.response
  }
}
const getSimilarMovies = (
  movie_id: number,
  language?: string,
  page?: number
): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    dispatch(
      localActions.setSimilarMovies(
        await moviesApi.getSimilar(movie_id, language, page)
      )
    )
  } catch (error) {
    throw error.response
  }
}
const getRecommendations = (
  movie_id: number,
  language?: string,
  page?: number
): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    dispatch(
      localActions.setRecommendations(
        await moviesApi.getRecommendations(movie_id, language, page)
      )
    )
  } catch (error) {
    throw error.response
  }
}
const getUpcomingMovies = (
  language?: string,
  page?: number,
  region?: string
): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    dispatch(
      localActions.setUpcoming(
        await moviesApi.getUpcoming(language, page, region)
      )
    )
  } catch (error) {
    throw error.response
  }
}
export const actions = {
  getMovieDetails,
  getTopRatedMovies,
  getPopularMovies,
  getRecommendations,
  getSimilarMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
}
