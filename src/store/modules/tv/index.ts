import { useSelector } from 'react-redux'
import { useActions } from '@src/hooks/useActions'
import { actions, tvReducer } from './reducer'
import {
  getAiringToday,
  getOnTheAir,
  getPopular,
  getRecommendations,
  getSimilar,
  getDetails,
  getTopRated,
  getExternalIds,
  getVideos,
} from './selectors'

export { tvReducer }

export const tv = {
  currentTV: {
    useDetails: () => useSelector(getDetails),
    useSimilar: () => useSelector(getSimilar),
    useRecommendations: () => useSelector(getRecommendations),
    useVideos: () => useSelector(getVideos),
    useExternalIds: () => useSelector(getExternalIds),
  },
  usePopular: () => useSelector(getPopular),
  useAiringToday: () => useSelector(getAiringToday),
  useOnTheAir: () => useSelector(getOnTheAir),
  useTopRated: () => useSelector(getTopRated),
  useActions: (): typeof actions => useActions(actions),
}
