import { http } from './http-client.js'
import {
  TTVDetails,
  TPopularTV,
  TTopRatedTV,
  TOnTheAirTV,
  TAiringTodayTV,
  TRecommendations,
  TSimilarTV,
  TTVExternalIds,
  TVideo,
} from '@src/store/modules/tv/types'
import { createQueryString } from '@src/lib/create_query_string'

const getDetails = (tv_id: number) =>
  http.get<TTVDetails>(`/tv/${tv_id}?`).then((res) => res.data)
const getPopular = (page?: number) =>
  http
    .get<TPopularTV>(`/tv/popular?${createQueryString({ page })}`)
    .then((res) => res.data)
const getTopRated = (page?: number) =>
  http
    .get<TTopRatedTV>(`/tv/top_rated?${createQueryString({ page })}`)
    .then((res) => res.data)
const getOnTheAir = (page?: number) =>
  http
    .get<TOnTheAirTV>(`/tv/on_the_air?${createQueryString({ page })}`)
    .then((res) => res.data)
const getAiringToday = (page?: number) =>
  http
    .get<TAiringTodayTV>(`/tv/airing_today?${createQueryString({ page })}`)
    .then((res) => res.data)
const getSimilar = (tv_id: number, page?: number) =>
  http
    .get<TSimilarTV>(`/tv/${tv_id}/similar?${createQueryString({ page })}`)
    .then((res) => res.data)

const getRecommendations = (tv_id: number, page?: number) =>
  http
    .get<TRecommendations>(
      `/tv/${tv_id}/recommendations?${createQueryString({
        page,
      })}`
    )
    .then((res) => res.data)
const getVideos = (movie_id: number) =>
  http.get<TVideo>(`/tv/${movie_id}/videos?`).then((res) => res.data)

const getExternalIds = (movie_id: number) =>
  http
    .get<TTVExternalIds>(`/tv/${movie_id}/external_ids?`)
    .then((res) => res.data)

export const tvApi = {
  getDetails,
  getPopular,
  getTopRated,
  getOnTheAir,
  getAiringToday,
  getSimilar,
  getVideos,
  getRecommendations,
  getExternalIds,
}
