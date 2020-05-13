import { AppStateType, InferActionsTypes } from '../store';
import { ThunkAction } from 'redux-thunk';
import { authApi } from '@src/api';
import { Dispatch } from 'redux';
import { localStorage } from '@src/lib/local-storage';

let initialState = {
  isAuth: false,
};

export type InitialStateType = typeof initialState;

const authReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'tmdb/auth/SET_AUTH_STATUS':
      return { ...state, isAuth: action.isAuth };
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  setAuthStatus: (isAuth: boolean) =>
    ({ type: 'tmdb/auth/SET_AUTH_STATUS', isAuth } as const),
};

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;
type DispatchType = Dispatch<ActionsTypes>;

const _saveSessionToLocalStorage = (
  session_id: string,
  request_token: string,
  expires_at: string
): void =>
  localStorage.save('session', {
    session_id,
    token: { request_token, expires_at },
  });

export const authWithLogin = (
  username: string,
  password: string
): ThunkType => async (dispatch: DispatchType) => {
  try {
    const tokenResponse = await authApi.createRequestToken();
    const approvedTokenResponse = await authApi.createSessionWithLogin(
      username,
      password,
      tokenResponse.request_token
    );
    console.log(approvedTokenResponse);
    const sessionResponse = await authApi.createSession(
      approvedTokenResponse.request_token
    );
    dispatch(actions.setAuthStatus(true));

    _saveSessionToLocalStorage(
      sessionResponse.session_id,
      approvedTokenResponse.request_token,
      approvedTokenResponse.expires_at
    );
  } catch (error) {
    console.log(error.response);
  }
};

export const authWithoutLogin = (): ThunkType => async (
  dispatch: DispatchType
) => {
  const tokenResponse = await authApi.createRequestToken();
  console.log(tokenResponse);
  const win = window.open(
    authApi.getAuthLink(tokenResponse.request_token),
    '_blank',
    'height=600,width=600'
  );
  const interval = setInterval(function () {
    if (win!.closed) {
      clearInterval(interval);
      authApi
        .createSession(tokenResponse.request_token)
        .then((sessionResponse) => {
          dispatch(actions.setAuthStatus(true));
          _saveSessionToLocalStorage(
            sessionResponse.session_id,
            tokenResponse.request_token,
            tokenResponse.expires_at
          );
        })
        .catch((err) => console.log(err.response));
    }
  }, 500);
};
export const logout = (): ThunkType => async (dispatch: DispatchType) => {
  actions.setAuthStatus(false);
  authApi.deleteSession(localStorage.load('session').session_id);
  localStorage.remove('session');
};
export default authReducer;
