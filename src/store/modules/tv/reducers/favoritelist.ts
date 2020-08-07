import { InferActionsTypes, BaseThunkType } from '../../..'

import { Dispatch } from 'redux'
import { moviesApi, accountApi } from '@src/api'

import { TResult } from '../types'
import { TResponseError } from '@src/api/types'

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
type TInitialState = typeof initialState

let initialState = {
  data: {} as TResult,
  isLoading: false,
  error: null as TResponseError | null,
}

export const favoritelistReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/tv/favoritelist/SET_ITEMS':
      return {
        ...state,
        data: action.payload.data,
      }
    case 'tmdb/tv/favoritelist/SET_LOADING_STATUS':
      return { ...state, isLoading: action.payload.isLoading }
    case 'tmdb/tv/favoritelist/SET_ERROR':
      return {
        ...state,
        error: action.payload.error,
      }
    default:
      return state
  }
}

const actions = {
  setData: (data: TResult) =>
    ({
      type: 'tmdb/tv/favoritelist/SET_ITEMS',
      payload: { data },
    } as const),
  setLoadingStatus: (isLoading: boolean) =>
    ({
      type: 'tmdb/tv/favoritelist/SET_LOADING_STATUS',
      payload: { isLoading },
    } as const),
  setError: (error: TResponseError | null) =>
    ({
      type: 'tmdb/tv/favoritelist/SET_ERROR',
      payload: { error },
    } as const),
}

export const getFavoriteList = (page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>,
  getState
) => {
  try {
    dispatch(actions.setLoadingStatus(true))
    dispatch(
      actions.setData(
        await accountApi.getTVFavoriteList(
          getState().account.profileData!.id,
          page
        )
      )
    )
    dispatch(actions.setLoadingStatus(false))
    dispatch(actions.setError(null))
  } catch (error) {
    dispatch(actions.setError(error.response))
  }
}
