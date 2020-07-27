import { TMovie } from '../movies/types'
import { TTV } from '../tv/types'

export type TMultiSearch =
  | (TMovie & { media_type: 'movie' })
  | (TTV & { media_type: 'tv' })
  
export type TSearchResult = {
  page: number
  results: Array<TMultiSearch>
  total_results: number
  total_pages: number
}
