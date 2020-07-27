import { http } from './http-client.js'
import {
  TTVDetails,
  TPopularTV,
  TTopRatedTV,
  TOnTheAirTV,
  TAiringTodayTV,
  TRecommendations,
  TSimilarTV,
} from '@src/store/modules/tv/types'
import { createQueryString } from '@src/lib/create_query_string'


const getDetails = (tv_id: number) =>
  http.get<TTVDetails>(`/tv/${tv_id}?`).then((res) => res.data)
const getPopular = (language?: string, page?: number) =>
  http
    .get<TPopularTV>(`/tv/popular?${createQueryString({ language, page })}`)
    .then((res) => res.data)
const getTopRated = (language?: string, page?: number) =>
  http
    .get<TTopRatedTV>(`/tv/top_rated?${createQueryString({ language, page })}`)
    .then((res) => res.data)
const getOnTheAir = (language?: string, page?: number) =>
  http
    .get<TOnTheAirTV>(`/tv/on_the_air?${createQueryString({ language, page })}`)
    .then((res) => res.data)
const getAiringToday = (language?: string, page?: number) =>
  http
    .get<TAiringTodayTV>(
      `/tv/airing_today?${createQueryString({ language, page })}`
    )
    .then((res) => res.data)
const getSimilar = (tv_id: number, language?: string, page?: number) =>
  http
    .get<TSimilarTV>(
      `/tv/${tv_id}/similar?${createQueryString({ language, page })}`
    )
    .then((res) => res.data)

const getRecommendations = (tv_id: number, language?: string, page?: number) =>
  http
    .get<TRecommendations>(
      `/tv/${tv_id}/recommendations?${createQueryString({
        language,
        page,
      })}`
    )
    .then((res) => res.data)

export const tvApi = {
  getDetails,
  getPopular,
  getTopRated,
  getOnTheAir,
  getAiringToday,
  getSimilar,
  getRecommendations,
}
