import { useSelector } from 'react-redux'
import { searchReducer, actions } from './reducer'
import { getSearchResult } from './selectors'
import { useActions } from '@src/hooks/useActions'

export { searchReducer }

export const search = {
  useResult: () => useSelector(getSearchResult),
  useActions: (): typeof actions => useActions(actions),
}
