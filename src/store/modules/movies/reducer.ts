import { InferActionsTypes, BaseThunkType } from '../..'

import { Dispatch, Action } from 'redux'
import { moviesApi } from '@src/api'

import {
  TMovieDetails,
  TNowPlayingMovies,
  TPopularMovies,
  TTopRatedMovies,
  TSimilarMovies,
  TRecommendations,
  TUpcomingMovies,
  TVideo,
  TMovieExternalIds,
  TDiscoveredMovies,
  TDiscoverMovie,
} from './types'

type ActionsTypes = InferActionsTypes<typeof localActions>
type ThunkType = BaseThunkType<ActionsTypes>
type TInitialState = typeof initialState

let initialState = {
  currentMovie: {
    details: {} as TMovieDetails | null,
    similar: {} as TSimilarMovies | null,
    recommendations: {} as TRecommendations | null,
    videos: {} as TVideo | null,
    externalIds: {} as TMovieExternalIds | null,
  },
  popular: {} as TPopularMovies | null,
  nowPlaying: {} as TNowPlayingMovies | null,
  topRated: {} as TTopRatedMovies | null,
  upcoming: {} as TUpcomingMovies | null,
  discovered: {} as TDiscoveredMovies | null,
}

export const moviesReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/movies/SET_DETAILS':
      return {
        ...state,
        currentMovie: {
          ...state.currentMovie,
          details: action.payload.details,
        },
      }
    case 'tmdb/movies/SET_SIMILAR':
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
    case 'tmdb/movies/SET_VIDEOS':
      return {
        ...state,
        currentMovie: { ...state.currentMovie, videos: action.payload.videos },
      }
    case 'tmdb/movies/SET_EXTERNAL_IDS':
      return {
        ...state,
        currentMovie: {
          ...state.currentMovie,
          externalIds: action.payload.ids,
        },
      }
    case 'tmdb/movies/SET_POPULAR':
      return {
        ...state,
        popular: action.payload.movies,
      }
    case 'tmdb/movies/SET_NOW_PLAYING':
      return { ...state, nowPlaying: action.payload.movies }
    case 'tmdb/movies/SET_TOP_RATED':
      return { ...state, topRated: action.payload.movies }
    case 'tmdb/movies/SET_UPCOMING':
      return { ...state, upcoming: action.payload.movies }
    case 'tmdb/movies/SET_DISCOVERED':
      return { ...state, discovered: action.payload.movies }
    default:
      return state
  }
}

const localActions = {
  setDetails: (details: TMovieDetails | null) =>
    ({
      type: 'tmdb/movies/SET_DETAILS',
      payload: { details },
    } as const),
  setPopular: (movies: TPopularMovies | null) =>
    ({
      type: 'tmdb/movies/SET_POPULAR',
      payload: { movies },
    } as const),
  setNowPlaying: (movies: TNowPlayingMovies | null) =>
    ({
      type: 'tmdb/movies/SET_NOW_PLAYING',
      payload: { movies },
    } as const),
  setTopRated: (movies: TTopRatedMovies | null) =>
    ({
      type: 'tmdb/movies/SET_TOP_RATED',
      payload: { movies },
    } as const),
  setSimilar: (movies: TSimilarMovies | null) =>
    ({
      type: 'tmdb/movies/SET_SIMILAR',
      payload: { movies },
    } as const),
  setRecommendations: (movies: TRecommendations | null) =>
    ({
      type: 'tmdb/movies/SET_RECOMMENDATIONS',
      payload: { movies },
    } as const),
  setUpcoming: (movies: TUpcomingMovies | null) =>
    ({
      type: 'tmdb/movies/SET_UPCOMING',
      payload: { movies },
    } as const),
  setVideos: (videos: TVideo | null) =>
    ({ type: 'tmdb/movies/SET_VIDEOS', payload: { videos } } as const),
  setExternalIds: (ids: TMovieExternalIds | null) =>
    ({ type: 'tmdb/movies/SET_EXTERNAL_IDS', payload: { ids } } as const),
  setDiscovered: (movies: TDiscoveredMovies | null) =>
    ({ type: 'tmdb/movies/SET_DISCOVERED', payload: { movies } } as const),
}

const getMovieDetails = (movie_id: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setDetails(null))
    dispatch(localActions.setVideos(null))
    dispatch(localActions.setDetails(await moviesApi.getDetails(movie_id)))
    dispatch(localActions.setVideos(await moviesApi.getVideos(movie_id)))
  } catch (error) {
    throw error.response
  }
}
const getPopularMovies = (page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setPopular(null))
    dispatch(localActions.setPopular(await moviesApi.getPopular(page)))
  } catch (error) {
    throw error.response
  }
}
const getNowPlayingMovies = (page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setNowPlaying(null))
    dispatch(localActions.setNowPlaying(await moviesApi.getNowPlaying(page)))
  } catch (error) {
    throw error.response
  }
}
const getTopRatedMovies = (page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setTopRated(null))
    dispatch(localActions.setTopRated(await moviesApi.getTopRated(page)))
  } catch (error) {
    throw error.response
  }
}
const getSimilarMovies = (movie_id: number, page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setSimilar(null))
    dispatch(
      localActions.setSimilar(await moviesApi.getSimilar(movie_id, page))
    )
  } catch (error) {
    throw error.response
  }
}
const getRecommendations = (
  movie_id: number,
  page?: number
): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    dispatch(localActions.setRecommendations(null))
    dispatch(
      localActions.setRecommendations(
        await moviesApi.getRecommendations(movie_id, page)
      )
    )
  } catch (error) {
    throw error.response
  }
}
const getUpcomingMovies = (page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setUpcoming(null))
    dispatch(localActions.setUpcoming(await moviesApi.getUpcoming(page)))
  } catch (error) {
    throw error.response
  }
}
const getMovieExternalIds = (movie_id: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setExternalIds(null))
    dispatch(
      localActions.setExternalIds(await moviesApi.getExternalIds(movie_id))
    )
  } catch (error) {
    throw error.response
  }
}
const getDiscoveredMovies = (args: TDiscoverMovie): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setDiscovered(null))
    dispatch(localActions.setDiscovered(await moviesApi.getDiscovered(args)))
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
  getMovieExternalIds,
  getDiscoveredMovies,
}
