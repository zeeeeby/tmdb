import { InferActionsTypes, BaseThunkType } from '../../..'

import { Dispatch } from 'redux'
import { moviesApi } from '@src/api'

import { TNowPlayingMovies } from '../types'
import { TResponseError } from '@src/api/types'

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
type TInitialState = typeof initialState

let initialState = {
  data: {} as TNowPlayingMovies | null,
  isLoading: false,
  error: null as TResponseError | null,
}

export const nowPlayingReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/movies/now=playing/SET_ITEMS':
      return {
        ...state,
        data: action.payload.data,
      }
    case 'tmdb/movies/now=playing/SET_LOADING_STATUS':
      return { ...state, isLoading: action.payload.isLoading }
    case 'tmdb/movies/now=playing/SET_ERROR':
      return {
        ...state,
        error: action.payload.error,
      }
    default:
      return state
  }
}

const actions = {
  setData: (data: TNowPlayingMovies | null) =>
    ({
      type: 'tmdb/movies/now=playing/SET_ITEMS',
      payload: { data },
    } as const),
  setLoadingStatus: (isLoading: boolean) =>
    ({
      type: 'tmdb/movies/now=playing/SET_LOADING_STATUS',
      payload: { isLoading },
    } as const),
  setError: (error: TResponseError | null) =>
    ({
      type: 'tmdb/movies/now=playing/SET_ERROR',
      payload: { error },
    } as const),
}

export const getNowPlayingMovies = (page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(actions.setLoadingStatus(true))
    dispatch(actions.setData(await moviesApi.getNowPlaying(page)))
    dispatch(actions.setLoadingStatus(false))
  } catch (error) {
    dispatch(actions.setError(error.response))
  }
}
