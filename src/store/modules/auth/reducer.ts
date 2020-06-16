import { InferActionsTypes, BaseThunkType } from '../..';
import { authApi, accountApi } from '@src/api';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';

type ActionsTypes = InferActionsTypes<typeof localActions>;
type ThunkType = BaseThunkType<ActionsTypes>;
type TInitialState = typeof initialState;

type TResponseStatus = {
  ok: boolean;
  response: AxiosResponse | null;
};
let initialState = {
  isAuth: false,
  responseStatus: { ok: false, response: {} } as TResponseStatus,
};

export const authReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/auth/SET_AUTH_STATUS':
      return { ...state, isAuth: action.payload.isAuth };
    case 'tmdb/auth/SET_RESPONSE_STATUS':
      return {
        ...state,
        responseStatus: {
          ok: action.payload.ok,
          response: action.payload.response,
        },
      };
    default:
      return state;
  }
};

const localActions = {
  setAuthStatus: (isAuth: boolean) =>
    ({ type: 'tmdb/auth/SET_AUTH_STATUS', payload: { isAuth } } as const),
  setResponseStatus: ({ ok, response }: TResponseStatus) =>
    ({
      type: 'tmdb/auth/SET_RESPONSE_STATUS',
      payload: { ok, response },
    } as const),
};
const updateAuthStatus = (isAuth: boolean): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  dispatch(localActions.setAuthStatus(isAuth));
};
const signIn = (username: string, password: string): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    await authApi.signIn(username, password);

    dispatch(localActions.setAuthStatus(true));
    dispatch(localActions.setResponseStatus({ ok: true, response: null }));
  } catch (error) {
    dispatch(
      localActions.setResponseStatus({ ok: false, response: error.response })
    );
    throw error.message;
  }
};

const signUp = (): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    await authApi.signUp();

    dispatch(localActions.setAuthStatus(true));
    dispatch(localActions.setResponseStatus({ ok: true, response: null }));
  } catch (error) {
    dispatch(
      localActions.setResponseStatus({ ok: false, response: error.response })
    );
    throw error.message;
  }
};
const signOut = (): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    authApi.signOut();
    dispatch(localActions.setAuthStatus(false));
    dispatch(localActions.setResponseStatus({ ok: true, response: null }));
  } catch (error) {
    dispatch(
      localActions.setResponseStatus({ ok: false, response: error.response })
    );
    throw error.message;
  }
};

export const actions = {
  signUp,
  signOut,
  signIn,
  updateAuthStatus,
};
