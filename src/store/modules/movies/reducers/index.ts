import { combineReducers } from 'redux'
import { currentMovieReducer, getMovieDetails } from './currentMovie'
import { recommendationsReducer, getRecommendations } from './recommendations'
import { similarReducer, getSimilarMovies } from './similar'
import { discoveredReducer, getDiscoveredMovies } from './discovered'
import { nowPlayingReducer, getNowPlayingMovies } from './nowPlaying'
import { popularReducer, getPopularMovies } from './popular'
import { topRatedReducer, getTopRatedMovies } from './topRated'
import { upcomingReducer, getUpcomingMovies } from './upcoming'
import { watchlistReducer, getWatchList } from './watchlist'
import { favoritelistReducer, getFavoriteList } from './favoritelist'

export const moviesReducer = combineReducers({
  currentMovie: currentMovieReducer,
  recommendations: recommendationsReducer,
  similar: similarReducer,
  popular: popularReducer,
  nowPlaying: nowPlayingReducer,
  upcoming: upcomingReducer,
  topRated: topRatedReducer,
  discovered: discoveredReducer,
  watchlist: watchlistReducer,
  favoritelist: favoritelistReducer,
})

export const actions = {
  getMovieDetails,
  getRecommendations,
  getSimilarMovies,
  getDiscoveredMovies,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getWatchList,
  getFavoriteList,
}
