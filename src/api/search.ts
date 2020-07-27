import { http } from './http-client'
import { TSearchResult } from '@src/store/modules/search/types'
import { createQueryString } from '@src/lib/create_query_string'

const search = (query: string, page?: number, language?: string) =>
  http
    .get<TSearchResult>(
      `search/multi?${createQueryString({
        query,
        page,
        language,
      })}`
    )
    .then((res) => res.data)
export const searchApi = {
  search,
}
