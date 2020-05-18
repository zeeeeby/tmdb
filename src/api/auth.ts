import { http } from './http-client';
import { localStorage } from '@src/lib/local-storage';

type TCGSSuccess = {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
};

const _createGuestSession = () =>
  http
    .get<TCGSSuccess>('/authentication/guest_session/new')
    .then((res) => res.data);

type TCRTSuccess = {
  success: boolean;
  expires_at: string;
  request_token: string;
};

const _createRequestToken = () =>
  http.get<TCRTSuccess>('/authentication/token/new').then((res) => res.data);

const _createSessionWithLogin = (
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

const _createSession = (request_token: string) =>
  http
    .post<TCSSuccess>('/authentication/session/new', {
      request_token,
    })
    .then((res) => res.data);

type TDSSuccess = {
  success: boolean;
};

const _deleteSession = (session_id: string) =>
  http
    .delete<TDSSuccess>('/authentication/session', { data: { session_id } })
    .then((res) => res.data);

const _getAuthLink = (token: string) =>
  `https://www.themoviedb.org/authenticate/${token}`;

const _saveSessionToLocalStorage = (
  session_id: string,
  request_token: string,
  expires_at: string
): void =>
  localStorage.save('session', {
    session_id,
    token: { request_token, expires_at },
  });

const signIn = async (username: string, password: string) => {
  const tokenResponse = await _createRequestToken();
  const approvedTokenResponse = await _createSessionWithLogin(
    username,
    password,
    tokenResponse.request_token
  );

  const sessionResponse = await _createSession(
    approvedTokenResponse.request_token
  );

  _saveSessionToLocalStorage(
    sessionResponse.session_id,
    approvedTokenResponse.request_token,
    approvedTokenResponse.expires_at
  );
  return sessionResponse;
};


const signUp = async () => {
  const tokenResponse = await _createRequestToken();
  const win = window.open(
    _getAuthLink(tokenResponse.request_token),
    '_blank',
    'height=600,width=600'
  );
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("await");
    if (win!.closed) {
      const sessionResponse = await _createSession(tokenResponse.request_token);
      _saveSessionToLocalStorage(
        sessionResponse.session_id,
        tokenResponse.request_token,
        tokenResponse.expires_at
      );
      return sessionResponse;
    }
  }
};
const signOut = async () => {
  try {
    _deleteSession(localStorage.load('session').session_id);
    localStorage.remove('session');
  } catch (error) {
    console.log(error.response);
    localStorage.remove('session');
  }
};
export const authApi = {
  signIn,
  signUp,
  signOut,
};
