import { InferActionsTypes, BaseThunkType } from '../../..'

import { Dispatch } from 'redux'
import { tvApi } from '@src/api'

import { TTVDetails } from '../types'
import { TResponseError } from '@src/api/types'

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
type TInitialState = typeof initialState

let initialState = {
  data: {} as TTVDetails,
  isLoading: false,
  error: null as TResponseError | null,
}

export const currentTVReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/tv/currentTV/SET_ITEMS':
      return {
        ...state,
        data: action.payload.data,
      }
    case 'tmdb/tv/currentTV/SET_LOADING_STATUS':
      return { ...state, isLoading: action.payload.isLoading }
    case 'tmdb/tv/currentTV/SET_ERROR':
      return {
        ...state,
        error: action.payload.error,
      }
    default:
      return state
  }
}

const actions = {
  setData: (data: TTVDetails) =>
    ({
      type: 'tmdb/tv/currentTV/SET_ITEMS',
      payload: { data },
    } as const),
  setLoadingStatus: (isLoading: boolean) =>
    ({
      type: 'tmdb/tv/currentTV/SET_LOADING_STATUS',
      payload: { isLoading },
    } as const),
  setError: (error: TResponseError | null) =>
    ({
      type: 'tmdb/tv/currentTV/SET_ERROR',
      payload: { error },
    } as const),
}

export const getTVDetails = (tv_id: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    const appendToResponse = 'videos,external_ids'
    dispatch(actions.setLoadingStatus(true))
    dispatch(actions.setData(await tvApi.getDetails(tv_id, appendToResponse)))
    dispatch(actions.setLoadingStatus(false))
  } catch (error) {
    dispatch(actions.setError(error.response))
  }
}
