import React from 'react'
import { makeStyles, Typography, Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
}))

export const NavItems: React.FC = () => {
  const classes = useStyles()
  return (
    <Typography variant="h6" className={classes.title}>
      <Button color="inherit">
        <NavLink
          activeStyle={{
            borderBottom: '2px solid white',
          }}
          className={classes.link}
          to="/movies/"
        >
          Movies
        </NavLink>
      </Button>
      <Button color="inherit">
        <NavLink
          activeStyle={{
            borderBottom: '2px solid white',
          }}
          className={classes.link}
          to="/tv/"
        >
          TV Series
        </NavLink>
      </Button>
    </Typography>
  )
}
