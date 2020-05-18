import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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

type TProps = {
  isAuth: boolean;
};
export const Header: React.ComponentType<TProps> = (props) => {
  const classes = useStyles();

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
          {props.isAuth ? (
            <Button color="inherit">
              <Link className={classes.link} to="">
                Хых здарова
              </Link>
            </Button>
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
