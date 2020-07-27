import { AppStateType } from '@src/store'

export const getSearchResult = (state: AppStateType) => state.search.searchResults
