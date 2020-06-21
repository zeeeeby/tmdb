import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { auth } from '@src/store/modules/auth';

export const PrivateRoute: React.ComponentType<RouteProps> = (props) => {
  const isAuth = auth.useStatus();
  if (!isAuth) return <Redirect to="/login" />;
  return <Route {...props} />;
};
