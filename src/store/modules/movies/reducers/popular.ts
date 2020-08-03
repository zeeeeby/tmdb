import { InferActionsTypes, BaseThunkType } from '../../..'

import { Dispatch } from 'redux'
import { moviesApi } from '@src/api'

import { TPopularMovies } from '../types'
import { TResponseError } from '@src/api/types'

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
type TInitialState = typeof initialState

let initialState = {
  data: {} as TPopularMovies | null,
  isLoading: false,
  error: null as TResponseError | null,
}

export const popularReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/movies/popular/SET_ITEMS':
      return {
        ...state,
        data: action.payload.data,
      }
    case 'tmdb/movies/popular/SET_LOADING_STATUS':
      return { ...state, isLoading: action.payload.isLoading }
    case 'tmdb/movies/popular/SET_ERROR':
      return {
        ...state,
        error: action.payload.error,
      }
    default:
      return state
  }
}

const actions = {
  setData: (data: TPopularMovies | null) =>
    ({
      type: 'tmdb/movies/popular/SET_ITEMS',
      payload: { data },
    } as const),
  setLoadingStatus: (isLoading: boolean) =>
    ({
      type: 'tmdb/movies/popular/SET_LOADING_STATUS',
      payload: { isLoading },
    } as const),
  setError: (error: TResponseError | null) =>
    ({
      type: 'tmdb/movies/popular/SET_ERROR',
      payload: { error },
    } as const),
}

export const getPopularMovies = (page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(actions.setLoadingStatus(true))
    dispatch(actions.setData(await moviesApi.getPopular(page)))
    dispatch(actions.setLoadingStatus(false))
    dispatch(actions.setError(null))
  } catch (error) {
    dispatch(actions.setError(error.response))
  }
}
