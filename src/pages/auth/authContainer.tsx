import React from 'react';
import { connect } from 'react-redux';
import { signUp, signIn } from '@src/store/modules/auth';
import { Auth } from './auth';

type TMapDispatchToProps = {
  signIn: (username: string, password: string) => Promise<any>;
  signUp: () => Promise<any>;
};
const Component: React.FC<TMapDispatchToProps> = (props) => {
  return <Auth {...props} />;
};

export const AuthContainer = connect(null, { signUp, signIn })(Component);
