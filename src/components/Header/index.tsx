import React, { ReactEventHandler } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { FadeMenu } from './components/menu'
import { auth } from '@src/store/modules/auth'
import { account } from '@src/store/modules/account'
import { Backdrop, IconButton, InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { NavItems } from './components/nav-items'
import { search } from '@src/store/modules/search'
import { SearchResultsList } from './components/search-results-list'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '25px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBar: {
    position: 'relative',
    zIndex: theme.zIndex.drawer + 2,
  },
  searchForm: {
    transition: 'width 0.2s',
    width: 0,
    backgroundColor: 'white',
    color: 'black',
    '&.focused': {
      width: '40%',
    },
    '& > div': {
      width: '100%',
    },
  },
}))

export const Header: React.ComponentType = () => {
  const classes = useStyles()
  const isAuth = auth.useStatus()
  const profile = account.useProfileDetails()
  const history = useHistory()

  const searchInput = React.useRef<HTMLElement>(null)

  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')

  const handleToolBarClick = (event: any) => {
    if (event.target.dataset.target !== 'search') closeSearchInput()
  }

  const { find } = search.useActions()
  const searchResult = search.useResult()
  const [didResultFind, setFindStatus] = React.useState(false)

  let timeout = React.useRef(0)
  const handleChange = (event: any) => {
    const value = event.target.value
    if (timeout) clearTimeout(timeout.current)
    setSearchValue(value)
    timeout.current = window.setTimeout(() => {
      //@ts-ignore
      if (value) find(value, 1, true).then(() => setFindStatus(true))
    }, 300)
  }

  const onSubmit = (event: any) => {
    event.preventDefault()
    if (open) {
      if (!searchValue) return
      history.push(`/search?query=${searchValue}`)
      closeSearchInput()
    } else {
      setOpen(true)
      searchInput.current?.focus()
    }
  }
  const closeSearchInput = () => {
    setOpen(false)
    setFindStatus(false)
    setSearchValue('')
  }
  return (
    <div className={classes.root}>
      <Backdrop
        className={`${classes.backdrop} ${classes.cursorPointer}`}
        open={open}
        onClick={closeSearchInput}
      ></Backdrop>
      <AppBar className={classes.appBar} position="static">
        <Toolbar onClick={handleToolBarClick}>
          <NavItems />
          <form
            onSubmit={onSubmit}
            className={`${classes.searchForm} ${open ? 'focused' : ''}`}
            data-target="search"
          >
            <InputBase
              value={searchValue}
              onChange={handleChange}
              inputRef={searchInput}
              placeholder="Type to search"
              inputProps={{ 'aria-label': 'search', 'data-target': 'search' }}
            />
          </form>
          <IconButton data-target="search" onClick={onSubmit}>
            <SearchIcon
              data-target="search"
              className={classes.cursorPointer}
              style={{ color: 'white' }}
            ></SearchIcon>
          </IconButton>

          {isAuth ? (
            <FadeMenu
              avatarLink={`https://www.gravatar.com/avatar/${profile?.avatar?.gravatar?.hash}`}
            />
          ) : (
            <React.Fragment>
              <Button color="inherit">
                <Link className={classes.link} to="/login">
                  Sign In
                </Link>
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      <SearchResultsList
        isOpened={didResultFind}
        results={searchResult}
        onRedirect={() => {
          closeSearchInput()
        }}
      />
    </div>
  )
}
