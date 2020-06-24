import { useSelector } from 'react-redux'
import { useActions } from '@src/hooks/useActions'
import { actions, tvReducer } from './reducer'
import {
  getAiringTodayTV,
  getOnTheAirTV,
  getPopularTV,
  getRecommendations,
  getSimilarTV,
  getTVDetails,
  getTopRatedTVs,
} from './selectors'

export { tvReducer }

export const tv = {
  currentTV: {
    useDetails: () => useSelector(getTVDetails),
    useSimilar: () => useSelector(getSimilarTV),
    useRecommendations: () => useSelector(getRecommendations),
  },
  usePopular: () => useSelector(getPopularTV),
  useAiringToday: () => useSelector(getAiringTodayTV),
  useOnTheAir: () => useSelector(getOnTheAirTV),
  useTopRated: () => useSelector(getTopRatedTVs),
  useActions: (): typeof actions => useActions(actions),
}
