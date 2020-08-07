export type TUserProfile = {
  avatar: {
    gravatar: {
      hash: string
    }
  }
  id: number
  iso_639_1: string
  iso_3166_1: string
  name: string
  include_adult: boolean
  username: string
}

type T = {
  media_type: 'movie' | 'tv'
  media_id: number
}
export type TWatchList = T & { watchlist: boolean }

export type TFavorite = T & { favorite: boolean }
export type TAccountStates = {
  id: number
  favorite: boolean
  rated: boolean
  watchlist: boolean
}
