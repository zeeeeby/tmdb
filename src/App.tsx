import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import Container from '@material-ui/core/Container'

import { Header } from '@src/components/Header'
import { Auth, Movies, NowPlaying } from '@src/pages'

import { account } from '@src/store/modules/account'
import { auth } from '@src/store/modules/auth'
import { localStorage } from './lib/local-storage'
import { useDispatch } from 'react-redux'

export const App = () => {
  const { getProfile } = account.useActions()
  const { updateAuthStatus } = auth.useActions()
  useEffect(() => {
    const tryToGetProfile = async () => {
      try {
        const session_id: string = await localStorage.load('session').session_id

        if (session_id) {
          await getProfile()
          await updateAuthStatus(true)
        }
      } catch {}
    }
    tryToGetProfile()
  }, [])
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
  )
}
