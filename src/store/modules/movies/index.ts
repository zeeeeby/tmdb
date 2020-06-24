import { useSelector } from 'react-redux'

import { actions, moviesReducer } from './reducer'
import { useActions } from '@src/hooks/useActions'
import {
  getMovieDetails,
  getNowPlayingMovies,
  getPopularMovies,
  getRecommendations,
  getSimilarMovies,
  getTopRatedMovies,
} from './selectors'

export { moviesReducer }

export const movies = {
  currentMovie: {
    useDetails: () => useSelector(getMovieDetails),
    useSimilar: () => useSelector(getSimilarMovies),
    useRecommendations: () => useSelector(getRecommendations),
  },
  usePopular: () => useSelector(getPopularMovies),
  useNowPlayings: () => useSelector(getNowPlayingMovies),
  useTopRated: () => useSelector(getTopRatedMovies),
  useActions: (): typeof actions => useActions(actions),
}
