import { InferActionsTypes, BaseThunkType } from '../../..'

import { Dispatch } from 'redux'
import { tvApi } from '@src/api'

import { TRecommendations } from '../types'
import { TResponseError } from '@src/api/types'

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
type TInitialState = typeof initialState

let initialState = {
  data: {} as TRecommendations | null,
  isLoading: false,
  error: null as TResponseError | null,
}

export const recommendationsReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/tv/recommendations/SET_ITEMS':
      return {
        ...state,
        data: action.payload.data,
      }
    case 'tmdb/tv/recommendations/SET_LOADING_STATUS':
      return { ...state, isLoading: action.payload.isLoading }
    case 'tmdb/tv/recommendations/SET_ERROR':
      return {
        ...state,
        error: action.payload.error,
      }
    default:
      return state
  }
}

const actions = {
  setData: (data: TRecommendations | null) =>
    ({
      type: 'tmdb/tv/recommendations/SET_ITEMS',
      payload: { data },
    } as const),
  setLoadingStatus: (isLoading: boolean) =>
    ({
      type: 'tmdb/tv/recommendations/SET_LOADING_STATUS',
      payload: { isLoading },
    } as const),
  setError: (error: TResponseError | null) =>
    ({
      type: 'tmdb/tv/recommendations/SET_ERROR',
      payload: { error },
    } as const),
}

export const getRecommendations = (
  tv_id: number,
  page?: number
): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    dispatch(actions.setLoadingStatus(true))
    dispatch(actions.setData(await tvApi.getRecommendations(tv_id, page)))
    dispatch(actions.setLoadingStatus(false))
  } catch (error) {
    dispatch(actions.setError(error.response))
  }
}
