import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { UMenu } from './UMenu'
import { auth } from '@src/store/modules/auth'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  cardAction: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  grid: {
    flexShrink: 0,
    position: 'relative',
  },
})
export const CardItem: React.FC<any> = ({ children, onClick, type, id }) => {
  const classes = useStyles()
  const isAuth = auth.useStatus()
  return (
    <Grid className={classes.grid} item xs={6} sm={4} md={3} lg={2}>
      <Paper onClick={onClick} className={classes.root}>
        <Card className={classes.root}>
          <CardActionArea className={classes.cardAction}>
            {children}
          </CardActionArea>
        </Card>
      </Paper>
      {isAuth && (type === 'movie' || type === 'tv') && (
        <UMenu type={type} id={id} />
      )}
    </Grid>
  )
}
// (type === 'movie' || type === 'tv')
