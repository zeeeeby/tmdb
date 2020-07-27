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
    case 'tmdb/tv/SET_TV_DETAILS':
      return {
        ...state,
        currentTV: {
          ...state.currentTV,
          details: action.payload.details,
        },
      }
    case 'tmdb/tv/SET_SIMILAR_TV':
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
    case 'tmdb/tv/SET_POPULAR_TV':
      return {
        ...state,
        popularTV: action.payload.tv,
      }
    case 'tmdb/tv/SET_AIRING_TODAY_TV':
      return { ...state, airingTodayTV: action.payload.tv }
    case 'tmdb/tv/SET_ON_THE_AIR_TV':
      return { ...state, onTheAirTV: action.payload.tv }
    case 'tmdb/tv/SET_TOP_RATED_TV':
      return { ...state, topRatedTV: action.payload.tv }
    default:
      return state
  }
}

const localActions = {
  setTVDetails: (details: TTVDetails | null) =>
    ({
      type: 'tmdb/tv/SET_TV_DETAILS',
      payload: { details },
    } as const),
  setPopularTV: (tv: TPopularTV | null) =>
    ({
      type: 'tmdb/tv/SET_POPULAR_TV',
      payload: { tv },
    } as const),
  setTAiringTodayTV: (tv: TAiringTodayTV | null) =>
    ({
      type: 'tmdb/tv/SET_AIRING_TODAY_TV',
      payload: { tv },
    } as const),
  setOnTheAirTV: (tv: TOnTheAirTV | null) =>
    ({
      type: 'tmdb/tv/SET_ON_THE_AIR_TV',
      payload: { tv },
    } as const),
  setTopRatedTV: (tv: TTopRatedTV | null) =>
    ({
      type: 'tmdb/tv/SET_TOP_RATED_TV',
      payload: { tv },
    } as const),
  setSimilarTV: (tv: TSimilarTV | null) =>
    ({
      type: 'tmdb/tv/SET_SIMILAR_TV',
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
    dispatch(localActions.setTVDetails(null))
    dispatch(localActions.setTVDetails(await tvApi.getDetails(tv_id)))
  } catch (error) {
    throw error.response
  }
}
const getPopularTV = (language?: string, page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setPopularTV(null))
    dispatch(localActions.setPopularTV(await tvApi.getPopular(language, page)))
  } catch (error) {
    throw error.response
  }
}
const getAiringTodayTV = (
  language?: string,
  page?: number
): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    dispatch(localActions.setTAiringTodayTV(null))
    dispatch(
      localActions.setTAiringTodayTV(await tvApi.getAiringToday(language, page))
    )
  } catch (error) {
    throw error.response
  }
}
const getTopRatedTV = (language?: string, page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setTopRatedTV(null))
    dispatch(
      localActions.setTopRatedTV(await tvApi.getTopRated(language, page))
    )
  } catch (error) {
    throw error.response
  }
}
const getSimilarTV = (
  tv_id: number,
  language?: string,
  page?: number
): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    dispatch(localActions.setSimilarTV(null))
    dispatch(
      localActions.setSimilarTV(await tvApi.getSimilar(tv_id, language, page))
    )
  } catch (error) {
    throw error.response
  }
}
const getRecommendations = (
  tv_id: number,
  language?: string,
  page?: number
): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    dispatch(localActions.setRecommendations(null))
    dispatch(
      localActions.setRecommendations(
        await tvApi.getRecommendations(tv_id, language, page)
      )
    )
  } catch (error) {
    throw error.response
  }
}
const getOnTheAirTV = (language?: string, page?: number): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(localActions.setOnTheAirTV(null))
    dispatch(
      localActions.setOnTheAirTV(await tvApi.getOnTheAir(language, page))
    )
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
