import { useSelector, useDispatch } from 'react-redux';
import { getResponseStatus, getAuthStatus, getProfileData } from './selectors';

import { actions, authReducer } from './reducer';
import { useActions } from '@src/hooks/useActions';

export { authReducer };

export const auth = {
  useProfileData: () => useSelector(getProfileData),
  useStatus: () => useSelector(getAuthStatus),
  useResponseStatus: () => useSelector(getResponseStatus),
  useActions: (): typeof actions => useActions(actions),
};
