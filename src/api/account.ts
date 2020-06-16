import { http } from './http-client.js';
import { TUserProfile } from '@src/types.js';

const getDetails = () =>
  http.get<TUserProfile>('/account').then((res) => res.data);

export const accountApi = { getDetails };
