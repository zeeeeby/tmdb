import { http } from './http-client.js'
import {
  TMovieDetails,
  TPopularMovies,
  TNowPlayingMovies,
  TTopRatedMovies,
  TUpcomingMovies,
} from '@src/store/modules/movies/types'
import { getQueryString } from '@src/lib/get_query_string'

const getDetails = (movie_id: number) =>
  http
    .get<TMovieDetails>(`/movie/?${getQueryString({ movie_id })}`)
    .then((res) => res.data)

const getPopular = (language?: string, page?: number, region?: string) =>
  http
    .get<TPopularMovies>(
      `/movie/popular/?${getQueryString({ language, page, region })}`
    )
    .then((res) => res.data)

const getNowPlaying = (language?: string, page?: number, region?: string) =>
  http
    .get<TNowPlayingMovies>(
      `/movie/now_playing/?${getQueryString({ language, page, region })}`
    )
    .then((res) => res.data)

const getTopRated = (language?: string, page?: number, region?: string) =>
  http
    .get<TTopRatedMovies>(
      `/movie/top_rated/?${getQueryString({ language, page, region })}`
    )
    .then((res) => res.data)

const getUpcoming = () => (language?: string, page?: number, region?: string) =>
  http
    .get<TUpcomingMovies>(
      `/movie/upcoming/?${getQueryString({ language, page, region })}`
    )
    .then((res) => res.data)

export const moviesApi = {
  getDetails,
  getPopular,
  getNowPlaying,
  getTopRated,
  getUpcoming,
}
