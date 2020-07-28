import { http } from './http-client'
import { TSearchResult } from '@src/store/modules/search/types'
import { createQueryString } from '@src/lib/create_query_string'

const search = (query: string, page?: number) =>
  http
    .get<TSearchResult>(
      `search/multi?${createQueryString({
        page,
        query,
      })}`
    )
    .then((res) => res.data)
export const searchApi = {
  search,
}
