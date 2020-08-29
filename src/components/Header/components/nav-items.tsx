import React from 'react'
import {
  makeStyles,
  Typography,
  Button,
  Theme,
  MenuItem,
} from '@material-ui/core'
import { NavLink, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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
        fontSize: '11px',
        cursor: 'pointer',
        fontWeight: 'bold',
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
    top: '85%',
    borderRadius: '4px',
  },
}))

export const NavItems: React.FC = () => {
  const classes = useStyles()
  const [t] = useTranslation()
  return (
    <Typography variant="h6" className={classes.title}>
        <Button color="inherit">
        <NavLink className={classes.link} to="/">
          {t('home')}
        </NavLink>
      </Button>

      <Button className={classes.navWrapper} color="inherit">
        <div className={classes.link}>{t('movies')}</div>
        <div className={classes.navContent}>
          <ul>
            <MenuItem>
              <Link to={'/movies/'}>{t('popular movies')}</Link>
            </MenuItem>
            <MenuItem>
              <Link to={'/movies/now-playing'}>{t('now-playing movies')}</Link>
            </MenuItem>
            <MenuItem>
              <Link to={'/movies/top-rated'}>{t('top-rated movies')}</Link>
            </MenuItem>
            <MenuItem>
              <Link to={'/movies/upcoming'}>{t('upcoming movies')}</Link>
            </MenuItem>
          </ul>
        </div>
      </Button>
      <Button className={classes.navWrapper} color="inherit">
        <div className={classes.link}>{t('tv series')}</div>
        <div className={classes.navContent}>
          <ul>
            <MenuItem>
              <Link to={'/tv/'}>{t('popular tv')}</Link>
            </MenuItem>
            <MenuItem>
              <Link to={'/tv/airing-today'}>{t('airing-today tv')}</Link>
            </MenuItem>
            <MenuItem>
              <Link to={'/tv/top-rated'}>{t('top-rated tv')}</Link>
            </MenuItem>
            <MenuItem>
              <Link to={'/tv/on-the-air'}>{t('on-the-air tv')}</Link>
            </MenuItem>
          </ul>
        </div>
      </Button>
    </Typography>
  )
}
