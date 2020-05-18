import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '@src/store/store';
import { Header } from './Header';

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

type TMapStateToProps = ReturnType<typeof mapStateToProps>;

const Component = (props: TMapStateToProps) => {
  return (
    <div>
      <Header isAuth={props.isAuth} />
    </div>
  );
};

export const HeaderContainer = connect(mapStateToProps)(Component);
