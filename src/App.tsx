import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './hoc/private-route';

import Container from '@material-ui/core/Container';

import { Header } from '@src/components/Header';
import { Auth, Movies, NowPlaying } from '@src/pages';
function App() {
  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/"></Route>
          <Route path="/login" component={Auth} />
          <Route exact path="/movies" component={Movies}></Route>
          <Route path="/movies/now-playing" component={NowPlaying} />
        </Switch>
      </Container>
    </div>
  );
}
export default App;
