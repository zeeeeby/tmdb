import { InferActionsTypes, BaseThunkType } from '../..';
import { authApi, userApi } from '@src/api';
import { Dispatch } from 'redux';
import { TUserProfile } from '@src/types';
import { AxiosResponse } from 'axios';

type ActionsTypes = InferActionsTypes<typeof act>;
type ThunkType = BaseThunkType<ActionsTypes>;
type TInitialState = typeof initialState;

type TResponseStatus = {
  ok: boolean;
  response: AxiosResponse | null;
};
let initialState = {
  isAuth: false,
  profileData: {} as TUserProfile | null,
  responseStatus: { ok: false, response: {} } as TResponseStatus,
};

export const authReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/auth/SET_AUTH_STATUS':
      return { ...state, isAuth: action.payload.isAuth };
    case 'tmdb/auth/SET_USER_DATA':
      return { ...state, profileData: action.payload.user };
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

const act = {
  setAuthStatus: (isAuth: boolean) =>
    ({ type: 'tmdb/auth/SET_AUTH_STATUS', payload: { isAuth } } as const),
  setProfileData: (user: typeof initialState.profileData) =>
    ({
      type: 'tmdb/auth/SET_USER_DATA',
      payload: { user },
    } as const),
  setResponseStatus: ({ ok, response }: TResponseStatus) =>
    ({
      type: 'tmdb/auth/SET_RESPONSE_STATUS',
      payload: { ok, response },
    } as const),
};

const signIn = (username: string, password: string): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    await authApi.signIn(username, password);

    dispatch(act.setProfileData(await userApi.getDetails()));
    dispatch(act.setAuthStatus(true));
    dispatch(act.setResponseStatus({ ok: true, response: null }));
  } catch (error) {
    dispatch(act.setResponseStatus({ ok: false, response: error.response }));
    throw error.message
  }
};

const signUp = (): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    await authApi.signUp();

    dispatch(act.setProfileData(await userApi.getDetails()));
    dispatch(act.setAuthStatus(true));
    dispatch(act.setResponseStatus({ ok: true, response: null }));
  } catch (error) {
    dispatch(act.setResponseStatus({ ok: false, response: error.response }));
    throw error.message
  }
};
const signOut = (): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    authApi.signOut();
    dispatch(act.setAuthStatus(false))
    dispatch(act.setProfileData(null));
    dispatch(act.setResponseStatus({ ok: true, response: null }));
  } catch (error) {
    dispatch(act.setResponseStatus({ ok: false, response: error.response }));
    throw error.message
  }
};

export const actions = {
  signUp,
  signOut,
  signIn,
};
