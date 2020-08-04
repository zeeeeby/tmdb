import { InferActionsTypes, BaseThunkType } from '../../..'

import { Dispatch } from 'redux'
import { moviesApi } from '@src/api'

import { TMovieDetails } from '../types'
import { TResponseError } from '@src/api/types'

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
type TInitialState = typeof initialState

let initialState = {
  data: {} as TMovieDetails,
  isLoading: false,
  error: null as TResponseError | null,
}

export const currentMovieReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/movies/currentMovie/SET_DETAILS':
      return {
        ...state,
        data: action.payload.data,
      }
    case 'tmdb/movies/currentMovie/SET_LOADING_STATUS':
      return { ...state, isLoading: action.payload.isLoading }
    case 'tmdb/movies/currentMovie/SET_ERROR':
      return {
        ...state,
        error: action.payload.error,
      }
    default:
      return state
  }
}

const actions = {
  setData: (data: TMovieDetails) =>
    ({
      type: 'tmdb/movies/currentMovie/SET_DETAILS',
      payload: { data },
    } as const),
  setLoadingStatus: (isLoading: boolean) =>
    ({
      type: 'tmdb/movies/currentMovie/SET_LOADING_STATUS',
      payload: { isLoading },
    } as const),
  setError: (error: TResponseError | null) =>
    ({
      type: 'tmdb/movies/currentMovie/SET_ERROR',
      payload: { error },
    } as const),
}

export const getMovieDetails = (movie_id: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    const appendToResponse = 'videos,external_ids'
    dispatch(actions.setLoadingStatus(true))
    dispatch(
      actions.setData(await moviesApi.getDetails(movie_id, appendToResponse))
    )
    dispatch(actions.setLoadingStatus(false))
    dispatch(actions.setError(null))
  } catch (error) {
    dispatch(actions.setError(error.response))
  }
}
