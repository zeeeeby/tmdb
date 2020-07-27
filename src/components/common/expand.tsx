import React from 'react'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  expandBtn: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    position: 'relative',
    top: '-1.5em',
    cursor: 'pointer',
  },
  expanded: {
    top: 0,
  },
})
export const Expand: React.FC = ({ children }) => {
  const [isExpanded, switchExpansion] = React.useState(false)
  const classes = useStyles()
  return (
    <>
      {isExpanded && children}
      <div
        onClick={() => switchExpansion(!isExpanded)}
        className={`${classes.expandBtn} ${isExpanded && classes.expanded}`}
      >
        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>
    </>
  )
}
