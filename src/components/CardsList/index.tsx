import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { CardItem } from './CardItem'
import { MovieCard } from './MovieCard'

type TCards = {
  style?: object
}

const useStyles = makeStyles({
  container: {
    marginTop: '15px',
    marginBottom: '15px',
  },
})
export const CardsList: React.FC<TCards> = ({ children, style }) => {
  const styles = useStyles()
  console.log(children)
  return (
    <Grid
      style={style}
      alignItems="stretch"
      className={styles.container}
      container
      spacing={2}
    >
      {children
        ? children
        : Array(20)
            .fill(0)
            .map((el) => <MovieCard card={null as any} />)}
    </Grid>
  )
}
