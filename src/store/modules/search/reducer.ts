import { InferActionsTypes, BaseThunkType } from '../..'

import { Dispatch } from 'redux'
import { searchApi } from '@src/api'

import { TSearchResult } from './types'

type ActionsTypes = InferActionsTypes<typeof localActions>
type ThunkType = BaseThunkType<ActionsTypes>
type TInitialState = typeof initialState

let initialState = {
  searchResult: {} as TSearchResult | null,
}

export const searchReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/search/SET_RESULT':
      return { ...state, searchResult: action.payload.result }
    default:
      return state
  }
}

const localActions = {
  setResult: (result: TSearchResult | null) =>
    ({
      type: 'tmdb/search/SET_RESULT',
      payload: { result },
    } as const),
}

const find = (
  query: string,
  page?: number,
  inSearchInputMode?: boolean
): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    if (!inSearchInputMode) dispatch(localActions.setResult(null))
    dispatch(localActions.setResult(await searchApi.search(query, page)))
  } catch (error) {
    throw error.response
  }
}

export const actions = {
  find,
}
