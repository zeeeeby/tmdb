import { combineReducers } from 'redux'
import { currentTVReducer, getTVDetails } from './currentTV'
import { recommendationsReducer, getRecommendations } from './recommendations'
import { similarReducer, getSimilarTV } from './similar'
import { discoveredReducer, getDiscoveredTV } from './discovered'
import { airingTodayReducer, getAiringTodayTV } from './airingToday'
import { popularReducer, getPopularTV } from './popular'
import { topRatedReducer, getTopRatedTV } from './topRated'
import { onTheAirReducer, getOnTheAirTV } from './onTheAir'
import { watchlistReducer, getWatchList } from './watchlist'
import { favoritelistReducer, getFavoriteList } from './favoritelist'

export const tvReducer = combineReducers({
  currentTV: currentTVReducer,
  recommendations: recommendationsReducer,
  similar: similarReducer,
  popular: popularReducer,
  airingToday: airingTodayReducer,
  onTheAir: onTheAirReducer,
  topRated: topRatedReducer,
  discovered: discoveredReducer,
  watchlist: watchlistReducer,
  favoritelist: favoritelistReducer,
})

export const actions = {
  getRecommendations,
  getTVDetails,
  getSimilarTV,
  getDiscoveredTV,
  getAiringTodayTV,
  getPopularTV,
  getTopRatedTV,
  getOnTheAirTV,
  getWatchList,
  getFavoriteList,
}
