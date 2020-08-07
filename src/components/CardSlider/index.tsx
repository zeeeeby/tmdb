import React, { Children } from 'react'
import { CardsList } from '../CardsList'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  slider: {
    overflowX: 'auto',
    marginBottom: '15px',
    minWidth: '100%',
  },
})

export const CardSlider: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.slider}>
      <CardsList style={{ flexWrap: 'nowrap' }}>{children}</CardsList>
    </div>
  )
}
