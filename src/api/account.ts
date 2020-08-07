import { http } from './http-client.js'
import {
  TUserProfile,
  TWatchList,
  TFavorite,
} from '@src/store/modules/account/types'
import { TResponseError } from './types.js'
import { TPopularMovies } from '@src/store/modules/movies/types.js'
import { TPopularTV } from '@src/store/modules/tv/types.js'
import { createQueryString } from '@src/lib/create_query_string'

const getDetails = () =>
  http.get<TUserProfile>('/account').then((res) => res.data)

const addToWatchList = (account_id: number, body: TWatchList) =>
  http
    .post<TResponseError>(`/account/${account_id}/watchlist`, { ...body })
    .then((res) => res.data)

const markAsFavorite = (account_id: number, body: TFavorite) =>
  http
    .post<TResponseError>(`/account/${account_id}/favorite`, { ...body })
    .then((res) => res.data)

const getMovieWatchList = (account_id: number, page?: number) =>
  http
    .get<TPopularMovies>(
      `/account/${account_id}/watchlist/movies?${createQueryString({
        page,
      })}`
    )
    .then((res) => res.data)
const getMovieFavoriteList = (account_id: number, page?: number) =>
  http
    .get<TPopularMovies>(
      `/account/${account_id}/favorite/movies?${createQueryString({
        page,
      })}`
    )
    .then((res) => res.data)

const getTVWatchList = (account_id: number, page?: number) =>
  http
    .get<TPopularTV>(
      `/account/${account_id}/watchlist/tv?${createQueryString({
        page,
      })}`
    )
    .then((res) => res.data)
const getTVFavoriteList = (account_id: number, page?: number) =>
  http
    .get<TPopularTV>(
      `/account/${account_id}/favorite/tv?${createQueryString({
        page,
      })}`
    )
    .then((res) => res.data)
export const accountApi = {
  getDetails,
  addToWatchList,
  markAsFavorite,
  getMovieWatchList,
  getTVWatchList,
  getTVFavoriteList,
  getMovieFavoriteList,
}
