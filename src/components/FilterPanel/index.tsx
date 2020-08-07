import React from 'react'
import { makeStyles, Collapse } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import './index.css'
import { useToggle } from '@src/hooks/useToggle'

const useStyles = makeStyles({
  d: {
    maxHeight: 'auto',
    backgroundColor: 'red',
    overflow: 'hidden',
    transition: 'max-height 0.5s ease-out',
  },
  expandBtn: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    position: 'relative',
    cursor: 'pointer',
  },
  expanded: {
    maxHeight: '500px',
  },
})
export const FilterPanel: React.FC = () => {
  const classes = useStyles()
  const [isExpanded, switchExpansion] = React.useState(false)
  const [isOpen, toggle] = useToggle()

  const handleClick = () => {
    switchExpansion(!isExpanded)
    toggle()
  }
  return (
    <>
      <div onClick={handleClick} className={`${classes.expandBtn}`}>
        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa maiores
        repellendus id numquam officia. Porro nemo ducimus architecto itaque
        iste vero ipsam, sapiente expedita qui quam dolor minima autem nesciunt
        maxime ipsa, voluptatem ipsum eius?
      </Collapse>
    </>
  )
}
