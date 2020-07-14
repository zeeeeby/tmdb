import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { MovieCard } from './MovieCard'
import { TVCard } from './TVCard'

type TCard = 'movie' | 'tv'
type TCards = {
  cards: any[] | undefined
  cardType: TCard
}
const renderCards = (cards: any[] | undefined, cardType: TCard) => {
  switch (cardType) {
    case 'movie':
      return cards?.map((el) => <MovieCard card={el} />)
    case 'tv':
      return cards?.map((el) => <TVCard card={el} />)
    default:
      return null
  }
}
const useStyles = makeStyles({
  container: {
    margin: '15px 0',
  },
})
export const CardsList: React.FC<TCards> = ({ cards, cardType }) => {
  const styles = useStyles()
  return (
    <Grid className={styles.container} container spacing={2}>
      {renderCards(!cards ? Array(20).fill(0) : cards, cardType)}
    </Grid>
  )
}
