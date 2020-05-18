import { InferActionsTypes, BaseThunkType } from '../store';
import { authApi } from '@src/api';
import { Dispatch } from 'redux';
import { localStorage } from '@src/lib/local-storage';

type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
type TInitialState = typeof initialState;

let initialState = {
  isAuth: false,
};

const authReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/auth/SET_AUTH_STATUS':
      return { ...state, isAuth: action.isAuth };
    default:
      return state;
  }
};

export const actions = {
  setAuthStatus: (isAuth: boolean) =>
    ({ type: 'tmdb/auth/SET_AUTH_STATUS', isAuth } as const),
};

export const signIn = (username: string, password: string): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    const result = await authApi.signIn(username, password);
    console.log(result);
  } catch (error) {
    console.log(error.response);
  }
};

export const signUp = (): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    const result = await authApi.signUp();
    dispatch(actions.setAuthStatus(true));
    console.log(result);
  } catch (error) {
    console.log(error.response);
  }
};
export const signOut = (): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  authApi.signOut();
  actions.setAuthStatus(false);
};
export default authReducer;
