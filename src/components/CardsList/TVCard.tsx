import React from 'react'
import { getImageLink } from '@src/api'
import { TTV } from '@src/store/modules/tv/types'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import { makeStyles } from '@material-ui/core'
import { CardItem } from './CardItem'
import { useHistory } from 'react-router-dom'

type TCard = {
  card: TTV
  isLoading: boolean
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
export const TVCard: React.FC<TCard> = ({ card, isLoading }) => {
  const classes = useStyles()
  const history = useHistory()
  const handleClick = React.useCallback(() => {
    if (card.id) history.push('/tv/' + card.id.toString())
  }, [card])

  return (
    <CardItem type="tv" id={card?.id} onClick={handleClick}>
      {!isLoading ? (
        <img
          className={classes.media}
          src={getImageLink(card.poster_path)}
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
          {!isLoading ? (
            card.name
          ) : (
            <Skeleton animation="wave" variant="text" />
          )}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {!isLoading ? (
            `${
              card.first_air_date
                ? new Date(card.first_air_date).toLocaleDateString()
                : 'N/A'
            }, TV`
          ) : (
            <Skeleton animation="wave" variant="text" />
          )}
        </Typography>
      </CardContent>
    </CardItem>
  )
}
