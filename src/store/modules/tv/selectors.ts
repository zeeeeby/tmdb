import { AppStateType } from '@src/store'

export const getDetails = (state: AppStateType) => state.tv.currentTV.details
export const getSimilar = (state: AppStateType) => state.tv.currentTV.similar
export const getRecommendations = (state: AppStateType) =>
  state.tv.currentTV.recommendations
  export const getVideos = (state: AppStateType) =>
  state.tv.currentTV.videos
export const getExternalIds = (state: AppStateType) =>
  state.tv.currentTV.externalIds

export const getPopular = (state: AppStateType) => state.tv.popular
export const getOnTheAir = (state: AppStateType) => state.tv.onTheAir
export const getAiringToday = (state: AppStateType) => state.tv.airingToday
export const getTopRated = (state: AppStateType) => state.tv.topRated
