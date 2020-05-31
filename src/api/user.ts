import { http } from './http-client.js';
import { localStorage } from '@src/lib/local-storage';
import { TUserProfile } from '@src/types.js';

const getDetails = () =>
  http.get<TUserProfile>('/account').then((res) => res.data);

export const userApi = { getDetails };
