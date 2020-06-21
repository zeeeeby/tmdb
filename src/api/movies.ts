import { http } from './http-client.js';
import { TMovieDetails } from '@src/store/modules/movies/types';
import { getQueryString } from '@src/lib/get_query_string';

const getDetails = (movie_id: number) =>
  http.get<TMovieDetails>(`/movie/${movie_id}`).then((res) => res.data);

const getPopular = (language?: string, page?: number, region?: string) =>
  http
    .get<TMovieDetails>(`/movie/popular/?${getQueryString({ language, page, region })}`)
    .then((res) => res.data);


export const moviesApi = { getDetails, getPopular };
