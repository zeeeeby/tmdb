import { useSelector } from 'react-redux';
import { getProfileDetails } from './selectors';

import { actions, accountReducer } from './reducer';
import { useActions } from '@src/hooks/useActions';

export { accountReducer };

export const account = {
  useProfileDetails: () => useSelector(getProfileDetails),
  useActions: (): typeof actions => useActions(actions),
};
