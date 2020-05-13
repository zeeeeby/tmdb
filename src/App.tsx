import React from 'react';
import { connect } from 'react-redux';
import { authWithLogin } from './store/modules/auth';

type MapStatePropsType = {};

type MapDispatchPropsType = {
  authWithLogin: (username: string, password: string) => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

function App(props: PropsType) {
  return (
    <div className="App">
      <a onClick={() => props.authWithLogin('villione', 'dimasik5390')} href="#">
        click
      </a>
    </div>
  );
}

export default connect(null, { authWithLogin })(App);
