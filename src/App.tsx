import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { PrivateRoute } from './hoc/private-route';

import Container from '@material-ui/core/Container';

import { HeaderContainer as Header } from '@src/components/Header/HeaderContainer';
import { AuthContainer as Auth } from '@src/pages';
function App() {
  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/"></Route>
          <Route path="/login" component={Auth} />
          <PrivateRoute path="/private">secret</PrivateRoute>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
