import { InferActionsTypes, BaseThunkType } from '../../..'

import { Dispatch } from 'redux'
import { tvApi } from '@src/api'

import { TOnTheAirTV } from '../types'
import { TResponseError } from '@src/api/types'

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
type TInitialState = typeof initialState

let initialState = {
  data: {} as TOnTheAirTV | null,
  isLoading: false,
  error: null as TResponseError | null,
}

export const onTheAirReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/tv/onTheAir/SET_ITEMS':
      return {
        ...state,
        data: action.payload.data,
      }
    case 'tmdb/tv/onTheAir/SET_LOADING_STATUS':
      return { ...state, isLoading: action.payload.isLoading }
    case 'tmdb/tv/onTheAir/SET_ERROR':
      return {
        ...state,
        error: action.payload.error,
      }
    default:
      return state
  }
}

const actions = {
  setData: (data: TOnTheAirTV | null) =>
    ({
      type: 'tmdb/tv/onTheAir/SET_ITEMS',
      payload: { data },
    } as const),
  setLoadingStatus: (isLoading: boolean) =>
    ({
      type: 'tmdb/tv/onTheAir/SET_LOADING_STATUS',
      payload: { isLoading },
    } as const),
  setError: (error: TResponseError | null) =>
    ({
      type: 'tmdb/tv/onTheAir/SET_ERROR',
      payload: { error },
    } as const),
}

export const getOnTheAirTV = (page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(actions.setLoadingStatus(true))
    dispatch(actions.setData(await tvApi.getOnTheAir(page)))
    dispatch(actions.setLoadingStatus(false))
  } catch (error) {
    dispatch(actions.setError(error.response))
  }
}
