import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { FadeMenu } from './ui/menu';
import { auth } from '@src/store/modules/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
}));

export const Header: React.ComponentType = () => {
  const classes = useStyles();
  const isAuth = auth.useStatus();
  const proFile = auth.useProfileData();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit">
              <Link className={classes.link} to="/movies">
                Movies
              </Link>
            </Button>
            <Button color="inherit">
              <Link className={classes.link} to="/tv-shows">
                TV Shows
              </Link>
            </Button>
          </Typography>
          {isAuth ? (
            <FadeMenu
              avatarLink={`https://www.gravatar.com/avatar/${proFile?.avatar?.gravatar?.hash}`}
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
    </div>
  );
};
