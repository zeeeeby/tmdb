import { InferActionsTypes, BaseThunkType } from '../..'

import { Dispatch } from 'redux'

import {
  TAiringTodayTV,
  TOnTheAirTV,
  TPopularTV,
  TRecommendations,
  TSimilarTV,
  TTVDetails,
  TTopRatedTV,
} from './types'
import { tvApi } from '@src/api/tv'

type ActionsTypes = InferActionsTypes<typeof localActions>
type ThunkType = BaseThunkType<ActionsTypes>
type TInitialState = typeof initialState

let initialState = {
  currentTV: {
    details: {} as TTVDetails | null,
    similar: {} as TSimilarTV | null,
    recommendations: {} as TRecommendations | null,
  },
  popularTV: {} as TPopularTV | null,
  airingTodayTV: {} as TAiringTodayTV | null,
  onTheAirTV: {} as TOnTheAirTV | null,
  topRatedTV: {} as TTopRatedTV | null,
}

export const tvReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/tv/SET_DETAILS':
      return {
        ...state,
        currentTV: {
          ...state.currentTV,
          details: action.payload.details,
        },
      }
    case 'tmdb/tv/SET_SIMILAR':
      return {
        ...state,
        currentTV: {
          ...state.currentTV,
          similar: action.payload.tv,
        },
      }
    case 'tmdb/tv/SET_RECOMMENDATIONS':
      return {
        ...state,
        currentTV: {
          ...state.currentTV,
          recommendations: action.payload.tv,
        },
      }
    case 'tmdb/tv/SET_POPULAR':
      return {
        ...state,
        popularTV: action.payload.tv,
      }
    case 'tmdb/tv/SET_AIRING_TODAY':
      return { ...state, airingTodayTV: action.payload.tv }
    case 'tmdb/tv/SET_ON_THE_AIR':
      return { ...state, onTheAirTV: action.payload.tv }
    case 'tmdb/tv/SET_TOP_RATED':
      return { ...state, topRatedTV: action.payload.tv }
    default:
      return state
  }
}

const localActions = {
  setDetails: (details: TTVDetails | null) =>
    ({
      type: 'tmdb/tv/SET_DETAILS',
      payload: { details },
    } as const),
  setPopular: (tv: TPopularTV | null) =>
    ({
      type: 'tmdb/tv/SET_POPULAR',
      payload: { tv },
    } as const),
  setTAiringToday: (tv: TAiringTodayTV | null) =>
    ({
      type: 'tmdb/tv/SET_AIRING_TODAY',
      payload: { tv },
    } as const),
  setOnTheAir: (tv: TOnTheAirTV | null) =>
    ({
      type: 'tmdb/tv/SET_ON_THE_AIR',
      payload: { tv },
    } as const),
  setTopRated: (tv: TTopRatedTV | null) =>
    ({
      type: 'tmdb/tv/SET_TOP_RATED',
      payload: { tv },
    } as const),
  setSimilar: (tv: TSimilarTV | null) =>
    ({
      type: 'tmdb/tv/SET_SIMILAR',
      payload: { tv },
    } as const),
  setRecommendations: (tv: TRecommendations | null) =>
    ({
      type: 'tmdb/tv/SET_RECOMMENDATIONS',
      payload: { tv },
    } as const),
}

const getTVDetails = (tv_id: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setDetails(null))
    dispatch(localActions.setDetails(await tvApi.getDetails(tv_id)))
  } catch (error) {
    throw error.response
  }
}
const getPopularTV = (page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setPopular(null))
    dispatch(localActions.setPopular(await tvApi.getPopular(page)))
  } catch (error) {
    throw error.response
  }
}
const getAiringTodayTV = (page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setTAiringToday(null))
    dispatch(localActions.setTAiringToday(await tvApi.getAiringToday(page)))
  } catch (error) {
    throw error.response
  }
}
const getTopRatedTV = (page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setTopRated(null))
    dispatch(localActions.setTopRated(await tvApi.getTopRated(page)))
  } catch (error) {
    throw error.response
  }
}
const getSimilarTV = (tv_id: number, page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setSimilar(null))
    dispatch(localActions.setSimilar(await tvApi.getSimilar(tv_id, page)))
  } catch (error) {
    throw error.response
  }
}
const getRecommendations = (tv_id: number, page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setRecommendations(null))
    dispatch(
      localActions.setRecommendations(
        await tvApi.getRecommendations(tv_id, page)
      )
    )
  } catch (error) {
    throw error.response
  }
}
const getOnTheAirTV = (page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setOnTheAir(null))
    dispatch(localActions.setOnTheAir(await tvApi.getOnTheAir(page)))
  } catch (error) {
    throw error.response
  }
}

export const actions = {
  getSimilarTV,
  getTVDetails,
  getPopularTV,
  getRecommendations,
  getAiringTodayTV,
  getTopRatedTV,
  getOnTheAirTV,
}
