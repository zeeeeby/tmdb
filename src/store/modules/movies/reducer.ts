import { InferActionsTypes, BaseThunkType } from '../..';
import { authApi } from '@src/api';
import { Dispatch } from 'redux';


import { TMovieDetails } from './types';

type ActionsTypes = InferActionsTypes<typeof localActions>;
type ThunkType = BaseThunkType<ActionsTypes>;
type TInitialState = typeof initialState;

let initialState = {
  movieDetails: {} as TMovieDetails,
};

export const moviesReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/movie/SET_MOVIE_DETAILS':
      return { ...state, movieDetails: action.payload.details };
    default:
      return state;
  }
};

const localActions = {
  setMovieDetails: (details: TMovieDetails) =>
    ({
      type: 'tmdb/movie/SET_MOVIE_DETAILS',
      payload: { details },
    } as const),
};
