import React, { useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'

import Container from '@material-ui/core/Container'

import { Header } from '@src/components/Header'
import { Auth, movies, TV } from '@src/pages'

import { account } from '@src/store/modules/account'
import { auth } from '@src/store/modules/auth'
import { localStorage } from './lib/local-storage'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({})
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
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <Container maxWidth="lg">
          <Switch>
            <Route exact path="/"></Route>
            <Route path="/login" component={Auth} />
            <Route exact path="/movies/" component={movies.Popular} />
            <Route
              exact
              path="/movies/now-playing"
              component={movies.NowPlaying}
            />
            <Route exact path="/movies/top-rated" component={movies.TopRated} />
            <Route exact path="/movies/upcoming" component={movies.Upcoming} />
            <Route exact path="/movies/:id" component={movies.ByID} />

            <Route
              exact
              path="/movies/recommendations/:id"
              component={movies.Recommendations}
            />
            <Route
              exact
              path="/movies/similar/:id"
              component={movies.Similar}
            />
            <Route exact path="/tv/" component={TV} />
          </Switch>
        </Container>
      </div>
    </ThemeProvider>
  )
}
