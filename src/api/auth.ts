import { http } from './http-client';

type TCGSSuccess = {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
};

const createGuestSession = () =>
  http
    .get<TCGSSuccess>('/authentication/guest_session/new')
    .then((res) => res.data);

type TCRTSuccess = {
  success: boolean;
  expires_at: string;
  request_token: string;
};

const createRequestToken = () =>
  http.get<TCRTSuccess>('/authentication/token/new').then((res) => res.data);

const createSessionWithLogin = (
  username: string,
  password: string,
  request_token: string
) =>
  http
    .post<TCRTSuccess>('/authentication/token/validate_with_login', {
      username,
      password,
      request_token,
    })
    .then((res) => res.data);

type TCSSuccess = {
  type: 'success';
  success: boolean;
  session_id: string;
};

const createSession = (request_token: string) =>
  http
    .post<TCSSuccess>('/authentication/session/new', {
      request_token,
    })
    .then((res) => res.data);

type TDSSuccess = {
  success: boolean;
};

const deleteSession = (session_id: string) =>
  http
    .delete<TDSSuccess>('/authentication/session', { data: { session_id } })
    .then((res) => res.data);

const getAuthLink = (token: string) =>
  `https://www.themoviedb.org/authenticate/${token}`;

export const authApi = {
  createGuestSession,
  createRequestToken,
  createSession,
  createSessionWithLogin,
  deleteSession,
  getAuthLink,
};
