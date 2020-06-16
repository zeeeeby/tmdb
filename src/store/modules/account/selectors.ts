import { AppStateType } from '@src/store';

export const getProfileDetails = (state: AppStateType) =>
  state.account.profileData;
