import React from 'react';
import { connect } from 'react-redux';
import { authWithLogin } from './store/modules/auth';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './hoc/private-route';

import Container from '@material-ui/core/Container';

import { HeaderContainer as Header } from '@src/components/Header/HeaderContainer';

type MapStatePropsType = {};

type MapDispatchPropsType = {
  authWithLogin: (username: string, password: string) => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

function App(props: PropsType) {
  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/"></Route>
          <Route path="/login">login</Route>
          <PrivateRoute path="/private">secret</PrivateRoute>
        </Switch>
      </Container>
    </div>
  );
}

export default connect(null, { authWithLogin })(App);
