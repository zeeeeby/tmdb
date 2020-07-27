import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { MovieCard } from './MovieCard'
import { TVCard } from './TVCard'

type TCard = 'movie' | 'tv'
type TCards = {
  cards: any[] | undefined
  cardType: TCard
  style?: object
}
const renderCards = (cards: any[] | undefined, cardType: TCard) => {
  switch (cardType) {
    case 'movie':
      return cards?.map((el, idx) => <MovieCard key={idx} card={el} />)
    case 'tv':
      return cards?.map((el, idx) => <TVCard key={idx} card={el} />)
    default:
      return null
  }
}
const useStyles = makeStyles({
  container: {
    marginTop: '15px',
    marginBottom: '15px',
  },
})
export const CardsList: React.FC<TCards> = ({ cards, cardType, style }) => {
  const styles = useStyles()
  return (
    <Grid
      style={style}
      alignItems="stretch"
      className={styles.container}
      container
      spacing={2}
    >
      {renderCards(!cards ? Array(20).fill(0) : cards, cardType)}
    </Grid>
  )
}
