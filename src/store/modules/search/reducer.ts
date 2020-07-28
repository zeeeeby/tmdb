import { InferActionsTypes, BaseThunkType } from '../..'

import { Dispatch } from 'redux'
import { searchApi } from '@src/api'

import { TSearchResult } from './types'

type ActionsTypes = InferActionsTypes<typeof localActions>
type ThunkType = BaseThunkType<ActionsTypes>
type TInitialState = typeof initialState

let initialState = {
  searchResults: {} as TSearchResult | null,
}

export const searchReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/search/SET_SEARCH_RESULT':
      return { ...state, searchResults: action.payload.results }
    default:
      return state
  }
}

const localActions = {
  setSearchResult: (results: TSearchResult | null) =>
    ({
      type: 'tmdb/search/SET_SEARCH_RESULT',
      payload: { results },
    } as const),
}

const find = (
  query: string,
  page?: number,
  inSearchInputMode?: boolean
): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    if (!inSearchInputMode) dispatch(localActions.setSearchResult(null))
    dispatch(localActions.setSearchResult(await searchApi.search(query, page)))
  } catch (error) {     
    throw error.response
  }
}

export const actions = {
  find,
}
