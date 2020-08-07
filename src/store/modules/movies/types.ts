// Movie details
type TBelongsToCollection = {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}
type TProductionCompanies = {
  name: string
  id: number
  logo_path: string | null
  origin_country: string
}
type TProductionCountries = {
  iso_3166_1: string
  name: string
}
type TSpokenLanguages = {
  iso_639_1: string
  name: string
}

type TGenres = {
  id: number
  name: string
}
export type TMovieDetails = {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: null | TBelongsToCollection
  budget: number
  genres: Array<TGenres>
  homepage: string | null
  id: number
  imdb_id: string | null
  original_language: string
  original_title: string
  overview: string
  popularity: string
  poster_path: string | null
  production_companies: Array<TProductionCompanies>
  production_countries: Array<TProductionCountries>
  release_date: string
  revenue: number
  runtime: number | null
  spoken_languages: Array<TSpokenLanguages>
  status: string
  tagline: string | null
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  videos: TVideo
  external_ids: TMovieExternalIds
}

export type TMovie = {
  poster_path: string | null
  adult: boolean
  overview: string
  release_date: string
  genre_ids: Array<number>
  id: number
  original_title: string
  original_language: string
  title: string
  backdrop_path: string | null
  popularity: number
  vote_count: string
  video: boolean
  vote_average: number
}
export type TResult = {
  page: number
  results: Array<TMovie>
  total_results: number
  total_pages: number
}

export type TPopularMovies = TResult
export type TTopRatedMovies = TResult
export type TSimilarMovies = TResult
export type TRecommendations = TResult

export type TNowPlayingMovies = TResult & {
  dates: {
    maximum: string
    minimum: string
  }
}
export type TUpcomingMovies = TResult & {
  dates: {
    maximum: string
    minimum: string
  }
}

export type TVideo = {
  results: Array<{
    id: string
    iso_639_1: string
    iso_3166_1: string
    key: string
    name: string
    site: 'YouTube' | 'Vimeo'
    size: number
    type:
      | 'Trailer'
      | 'Teaser'
      | 'Clip'
      | 'Featurette'
      | 'Behind the Scenes'
      | 'Bloopers'
  }>
}

export type TSearchMovies = TResult
export type TDiscoveredMovies = TResult

export type TMovieExternalIds = {
  imdb_id: string | null
  facebook_id: string | null
  instagram_id: string | null
  twitter_id: string | null
}

export type TDiscoverMovie = {
  sort_by?: TSortBy
  language?: string
  region?: string
  certification_country?: string
  certification?: string
  'certification.lte'?: string | number
  'certification.gte'?: string | number
  include_adult?: boolean
  include_video?: boolean
  page?: number
  primary_release_year?: number
  'primary_release_date.gte'?: string | number
  'primary_release_date.lte'?: string | number
  'release_date.gte'?: string | number
  'release_date.lte'?: string
  with_release_type?: number
  year?: number
  'vote_count.gte'?: string | number
  'vote_count.lte'?: string | number
  'vote_average.gte'?: string | number
  'vote_average.lte'?: string | number
  with_cast?: string
  with_crew?: string
  with_people?: string
  with_companies?: string
  with_genres?: string
  without_genres?: string
  with_keywords?: string
  without_keywords?: string
  'with_runtime.gte'?: string | number
  'with_runtime.lte'?: string | number
  with_original_language?: string
}

type TSortBy =
  | 'popularity.asc'
  | 'popularity.desc'
  | 'release_date.asc'
  | 'release_date.desc'
  | 'revenue.asc'
  | 'revenue.desc'
  | 'primary_release_date.asc'
  | 'primary_release_date.desc'
  | 'original_title.asc'
  | 'original_title.desc'
  | 'vote_average.asc'
  | 'vote_average.desc'
  | 'vote_count.asc'
  | 'vote_count.desc'

