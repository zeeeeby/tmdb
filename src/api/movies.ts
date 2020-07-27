import { http } from './http-client.js'
import {
  TMovieDetails,
  TPopularMovies,
  TNowPlayingMovies,
  TTopRatedMovies,
  TUpcomingMovies,
  TSimilarMovies,
  TRecommendations,
  TVideo,
} from '@src/store/modules/movies/types'
import { createQueryString } from '@src/lib/create_query_string'

const getDetails = (movie_id: number, language?: string) =>
  http
    .get<TMovieDetails>(`/movie/${movie_id}?${createQueryString({ language })}`)
    .then((res) => res.data)

const getPopular = (language?: string, page?: number, region?: string) =>
  http
    .get<TPopularMovies>(
      `/movie/popular?${createQueryString({ language, page, region })}`
    )
    .then((res) => res.data)

const getNowPlaying = (language?: string, page?: number, region?: string) =>
  http
    .get<TNowPlayingMovies>(
      `/movie/now_playing?${createQueryString({ language, page, region })}`
    )
    .then((res) => res.data)

const getTopRated = (language?: string, page?: number, region?: string) =>
  http
    .get<TTopRatedMovies>(
      `/movie/top_rated?${createQueryString({ language, page, region })}`
    )
    .then((res) => res.data)

const getUpcoming = (language?: string, page?: number, region?: string) =>
  http
    .get<TUpcomingMovies>(
      `/movie/upcoming?${createQueryString({ language, page, region })}`
    )
    .then((res) => res.data)

const getSimilar = (movie_id: number, language?: string, page?: number) =>
  http
    .get<TSimilarMovies>(
      `/movie/${movie_id}/similar?${createQueryString({ language, page })}`
    )
    .then((res) => res.data)

const getRecommendations = (
  movie_id: number,
  language?: string,
  page?: number
) =>
  http
    .get<TRecommendations>(
      `/movie/${movie_id}/recommendations?${createQueryString({
        language,
        page,
      })}`
    )
    .then((res) => res.data)
const getVideos = (movie_id: number, language?: string) =>
  http
    .get<TVideo>(
      `/movie/${movie_id}/videos?${createQueryString({
        language,
      })}`
    )
    .then((res) => res.data)

export const moviesApi = {
  getDetails,
  getPopular,
  getNowPlaying,
  getTopRated,
  getUpcoming,
  getSimilar,
  getRecommendations,
  getVideos,
}
