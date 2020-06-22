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

type TMovie = {
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
// Popular movies

export type TPopularMovies = {
  page: number
  results: Array<TMovie>
  total_results: number
  total_pages: number
}
// Now playing movies
export type TNowPlayingMovies = {
  page: number
  results: Array<TMovie>
  dates: {
    maximum: string
    minimum: string
  }
  total_results: number
  total_pages: number
}

// Top rated movies

export type TTopRatedMovies = {
  page: number
  results: Array<TMovie>
  total_results: number
  total_pages: number
}

// Upcoming movies

export type TUpcomingMovies = {
  page: number
  results: Array<TMovie>
  dates: {
    maximum: string
    minimum: string
  }
  total_results: number
  total_pages: number
}
