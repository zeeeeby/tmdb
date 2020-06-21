import { http } from './http-client.js';
import { TUserProfile } from '@src/store/modules/account/types';

const getDetails = () =>
  http.get<TUserProfile>('/account').then((res) => res.data);

export const accountApi = { getDetails };
