import React from 'react'
import { getImageLink } from '@src/api'
import { TMovie } from '@src/store/modules/movies/types'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import { CardItem } from './CardItem'
import { useHistory } from 'react-router-dom'

type TCard = {
  card: TMovie
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

export const MovieCard: React.FC<TCard> = ({ card, isLoading }) => {
  const classes = useStyles()
  const history = useHistory()

  const handleClick = React.useCallback(() => {
    if (card.id) history.push('/movies/' + card.id.toString())
  }, [card])

  return (
    <CardItem type="movie" id={card?.id} onClick={handleClick}>
      {!isLoading ? (
        <img
          className={classes.media}
          src={getImageLink(card?.poster_path)}
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
            card.title
          ) : (
            <Skeleton animation="wave" variant="text" />
          )}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {!isLoading ? (
            `${
              card.release_date
                ? new Date(card.release_date).toLocaleDateString()
                : 'N/A'
            }, Movie`
          ) : (
            <Skeleton animation="wave" variant="text" />
          )}
        </Typography>
      </CardContent>
    </CardItem>
  )
}
