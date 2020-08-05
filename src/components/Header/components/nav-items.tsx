import React from 'react'
import { makeStyles, Typography, Button, Theme } from '@material-ui/core'
import { NavLink, Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  navWrapper: {
    position: 'relative',
    '&:hover div': {
      display: 'block',
    },
    '& ul': {
      listStyle: 'none',
      '& li': {
        cursor: 'pointer',
        padding: '7px 0px',
        '& a': {
          color: 'black',
        },
      },
    },
  },
  navContent: {
    display: 'none',
    position: 'absolute',
    backgroundColor: 'aliceblue;',
    width: '140%',
    top: '85%',
    borderRadius: '4px',
  },
}))

export const NavItems: React.FC = () => {
  const classes = useStyles()
  return (
    <Typography variant="h6" className={classes.title}>
      <Button color="inherit">
        <NavLink className={classes.link} to="/">
          Home
        </NavLink>
      </Button>

      <Button className={classes.navWrapper} color="inherit">
        <div className={classes.link}>Movies</div>
        <div className={classes.navContent}>
          <ul>
            <li>
              <Link to={'/movies/'}>Popular</Link>
            </li>
            <li>
              <Link to={'/movies/now-playing'}>Now playing</Link>
            </li>
            <li>
              <Link to={'/movies/top-rated'}>Top rated</Link>
            </li>
            <li>
              <Link to={'/movies/upcoming'}>Upcoming</Link>
            </li>
          </ul>
        </div>
      </Button>
      <Button className={classes.navWrapper} color="inherit">
        <div className={classes.link}>TV Series</div>
        <div className={classes.navContent}>
          <ul>
            <li>
              <Link to={'/tv/'}>Popular</Link>
            </li>
            <li>
              <Link to={'/tv/airing-today'}>Airing today</Link>
            </li>
            <li>
              <Link to={'/tv/top-rated'}>Top rated</Link>
            </li>
            <li>
              <Link to={'/tv/on-the-air'}>On the air</Link>
            </li>
          </ul>
        </div>
      </Button>
    </Typography>
  )
}
