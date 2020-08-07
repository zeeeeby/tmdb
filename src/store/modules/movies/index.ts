import { useSelector } from 'react-redux'

import { actions, moviesReducer } from './reducers'
import { useActions } from '@src/hooks/useActions'
import {
  getDetails,
  getNowPlaying,
  getPopular,
  getRecommendations,
  getSimilar,
  getTopRated,
  getUpcoming,
  getDiscovered,
  getWatchList,
  getFavoriteList,
} from './selectors'

export { moviesReducer }

export const movies = {
  currentMovie: {
    useDetails: () => useSelector(getDetails),
  },
  usePopular: () => useSelector(getPopular),
  useNowPlaying: () => useSelector(getNowPlaying),
  useTopRated: () => useSelector(getTopRated),
  useUpcoming: () => useSelector(getUpcoming),
  useDiscovered: () => useSelector(getDiscovered),
  useSimilar: () => useSelector(getSimilar),
  useRecommendations: () => useSelector(getRecommendations),
  useWatchList: () => useSelector(getWatchList),
  useFavoriteList: () => useSelector(getFavoriteList),
  useActions: (): typeof actions => useActions(actions),
}
