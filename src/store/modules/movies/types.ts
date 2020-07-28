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
type TResult = {
  page: number
  results: Array<TMovie> | null
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
  id: number
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
