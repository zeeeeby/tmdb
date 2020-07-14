import React from 'react'
import { TTV } from '@src/store/modules/tv/types'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import { makeStyles } from '@material-ui/core'
import { CardItem } from './CardItem'

type TCard = {
  card: TTV
}
const useStyles = makeStyles({
  media: {
    maxWidth: '100%!important',
    width: '100%',
    display: 'block',
  },
  cardContent: {
    alignSelf: 'end',
    boxSizing: 'border-box',
    width: '100%',
  },
  skeletonMedia: {
    height: '400px',
    maxWidth: '100%!important',
    width: '100%',
    display: 'block',
  },
})
export const TVCard: React.FC<TCard> = ({ card }) => {
  const classes = useStyles()
  return (
    <CardItem>
      {card ? (
        <img
          className={classes.media}
          src={'https://image.tmdb.org/t/p/w500/' + card.poster_path}
          alt="poster"
        />
      ) : (
        <Skeleton
          animation="wave"
          variant="rect"
          className={classes.skeletonMedia}
        >
          <img className={classes.media} alt="skeleton" />
        </Skeleton>
      )}
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="body2" component="h2">
          {card ? card.name : <Skeleton animation="wave" variant="text" />}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {card ? (
            card.release_date
          ) : (
            <Skeleton animation="wave" variant="text" />
          )}
        </Typography>
      </CardContent>
    </CardItem>
  )
}
