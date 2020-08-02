import { useSelector } from 'react-redux'

import { actions, moviesReducer } from './reducer'
import { useActions } from '@src/hooks/useActions'
import {
  getDetails,
  getNowPlaying,
  getPopular,
  getRecommendations,
  getSimilar,
  getTopRated,
  getUpcoming,
  getVideos,
  getDiscovered,
  getExternalIds,
} from './selectors'

export { moviesReducer }

export const movies = {
  currentMovie: {
    useDetails: () => useSelector(getDetails),
    useSimilar: () => useSelector(getSimilar),
    useRecommendations: () => useSelector(getRecommendations),
    useVideos: () => useSelector(getVideos),
    useExternalIds: () => useSelector(getExternalIds),
  },
  usePopular: () => useSelector(getPopular),
  useNowPlaying: () => useSelector(getNowPlaying),
  useTopRated: () => useSelector(getTopRated),
  useActions: (): typeof actions => useActions(actions),
  useUpcoming: () => useSelector(getUpcoming),
  useDiscovered: () => useSelector(getDiscovered),
}
