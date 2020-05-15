import React from 'react';
import { connect } from 'react-redux';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { AppStateType } from '@src/store/store';

const mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});
type TMapStateToProps = {
  isAuth?: boolean;
};

const Component: React.ComponentType<RouteProps & TMapStateToProps> = (
  props
) => {
  const { isAuth, ...restProps } = props;
  if (!isAuth) return <Redirect to="/login" />;
  return <Route {...restProps} />;
};

export const PrivateRoute = connect(mapStateToPropsForRedirect)(Component);
