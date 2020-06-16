import { useSelector } from 'react-redux';
import { getResponseStatus, getAuthStatus } from './selectors';

import { actions, authReducer } from './reducer';
import { useActions } from '@src/hooks/useActions';

export { authReducer };

export const auth = {
  useStatus: () => useSelector(getAuthStatus),
  useResponseStatus: () => useSelector(getResponseStatus),
  useActions: (): typeof actions => useActions(actions),
};
