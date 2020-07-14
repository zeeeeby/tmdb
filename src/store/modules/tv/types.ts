export type TTVDetails = {
  backdrop_path: string | null
  created_by: Array<{
    id: number
    credit_id: string
    name: string
    gender: number
    profile_path: string
  }>
  episode_run_time: Array<number>
  first_air_date: string

  genres: Array<{
    id: number
    name: string
  }>
  homepage: string
  id: number
  in_production: boolean
  languages: Array<string>
  last_air_date: string
  last_episode_to_air: {
    air_date: string
    episode_number: number
    id: number
    name: string
    overview: string
    production_code: string
    season_number: number
    show_id: number
    still_path: string
    vote_average: number
    vote_count: number
  }
  name: string
  next_episode_to_air: null
  networks: {
    name: string
    id: number
    logo_path: string
    origin_country: string
  }
  number_of_episodes: string
  number_of_seasons: string
  origin_country: Array<string>
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string | null

  production_companies: Array<{
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }>

  seasons: Array<{
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: string
  }>
  status: string
  type: string
  vote_average: number
  vote_count: number
}

export type TTV = {
  poster_path: string | null
  adult: boolean
  overview: string
  release_date: string
  genre_ids: Array<number>
  id: number
  name: string
  original_name: string
  original_language: string
  backdrop_path: string | null
  popularity: number
  vote_count: string
  vote_average: number
  first_air_date: string
  origin_country: Array<string>
}
type TResult = {
  page: number
  results: Array<TTV>
  total_results: number
  total_pages: number
}
export type TPopularTV = TResult
export type TTopRatedTV = TResult
export type TAiringTodayTV = TResult
export type TOnTheAirTV = TResult
export type TSimilarTV = TResult
export type TRecommendations = TResult
