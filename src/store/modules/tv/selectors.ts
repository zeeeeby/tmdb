import { AppStateType } from '@src/store'

export const getTVDetails = (state: AppStateType) => state.tv.currentTV.details
export const getSimilarTV = (state: AppStateType) => state.tv.currentTV.similar
export const getRecommendations = (state: AppStateType) =>
  state.tv.currentTV.recommendations

export const getPopularTV = (state: AppStateType) => state.tv.popularTV
export const getOnTheAirTV = (state: AppStateType) => state.tv.onTheAirTV
export const getAiringTodayTV = (state: AppStateType) => state.tv.airingTodayTV
export const getTopRatedTVs = (state: AppStateType) => state.tv.topRatedTV
