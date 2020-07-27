import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import { TSearchResult, TMultiSearch } from '@src/store/modules/search/types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
      position: 'absolute',
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      zIndex: theme.zIndex.drawer + 3,
    },
  })
)
type T = {
  isOpened: boolean
  results: TSearchResult | null
}
export const SearchResultsList: React.FC<T> = ({ isOpened, results }) => {
  const classes = useStyles()
  const handleClick = (value: number) => () => {}

  return (
    <>
      {isOpened && (
        <List className={classes.root}>
          {results?.total_results ? (
            results?.results.map((value) => {
              return (
                <ListItem
                  key={value.id}
                  role={undefined}
                  dense
                  button
                  onClick={handleClick(1)}
                >
                  <ListItemText
                    style={{ marginTop: 0 }}
                    primary={`${getTitle(value)}`}
                  />
                  <ListItemSecondaryAction></ListItemSecondaryAction>
                </ListItem>
              )
            })
          ) : (
            <div>НЕТ РЕЗУЛЬТАТОВ</div>
          )}
        </List>
      )}
    </>
  )
}
const getTitle = (media: TMultiSearch) => {
  switch (media.media_type) {
    case 'movie':
      return media.title + ' (Movie)'
    case 'tv':
      return media.name + ' (TV)'
    default:
      return 'NOT STATED (Persona)'
  }
}
