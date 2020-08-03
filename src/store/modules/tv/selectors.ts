import { AppStateType } from '@src/store'

export const getDetails = (state: AppStateType) => state.tv.currentTV
export const getSimilar = (state: AppStateType) => state.tv.similar
export const getRecommendations = (state: AppStateType) =>
  state.tv.recommendations

export const getPopular = (state: AppStateType) => state.tv.popular
export const getOnTheAir = (state: AppStateType) => state.tv.onTheAir
export const getAiringToday = (state: AppStateType) => state.tv.airingToday
export const getTopRated = (state: AppStateType) => state.tv.topRated
