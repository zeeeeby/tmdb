import { AppStateType } from '@src/store';

export const getAuthStatus = (state: AppStateType) => state.auth.isAuth;
export const getResponseStatus = (state: AppStateType) =>
  state.auth.responseStatus;
