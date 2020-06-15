import { AppStateType } from '@src/store';

export const getAuthStatus = (state: AppStateType) => state.auth.isAuth;
export const getProfileData = (state: AppStateType) => state.auth.profileData;
export const getResponseStatus = (state: AppStateType) =>
  state.auth.responseStatus;
