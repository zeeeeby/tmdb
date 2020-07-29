import { AppStateType } from '@src/store'

export const getDetails = (state: AppStateType) => state.tv.currentTV.details
export const getSimilar = (state: AppStateType) => state.tv.currentTV.similar
export const getRecommendations = (state: AppStateType) =>
  state.tv.currentTV.recommendations

export const getPopular = (state: AppStateType) => state.tv.popularTV
export const getOnTheAir = (state: AppStateType) => state.tv.onTheAirTV
export const getAiringToday = (state: AppStateType) => state.tv.airingTodayTV
export const getTopRated = (state: AppStateType) => state.tv.topRatedTV
