import { InferActionsTypes, BaseThunkType } from '../..';
import { accountApi } from '@src/api';
import { Dispatch } from 'redux';
import { TUserProfile } from '@src/types';
import { AxiosResponse } from 'axios';


type ActionsTypes = InferActionsTypes<typeof act>;
type ThunkType = BaseThunkType<ActionsTypes>;
type TInitialState = typeof initialState;

let initialState = {
  profileData: {} as TUserProfile | null,
};
export const accountReducer = (
  state = initialState,
  action: ActionsTypes
): TInitialState => {
  switch (action.type) {
    case 'tmdb/account/SET_PROFILE_DETAILS':
      return { ...state, profileData: action.payload.user };
    default:
      return state;
  }
};
const act = {
  setProfileDetails: (user: typeof initialState.profileData) =>
    ({
      type: 'tmdb/account/SET_PROFILE_DETAILS',
      payload: { user },
    } as const),
};

const getProfile = (): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(act.setProfileDetails(await accountApi.getDetails()));
  } catch (error) {
    throw error.response;
  }
};

const removeProfile = (): ThunkType => async (
  dispatch: Dispatch<ActionsTypes>
) => {
  try {
    dispatch(act.setProfileDetails(null));
  } catch (error) {
    throw error.response;
  }
};

export const actions = {
  getProfile,
  removeProfile,
};
