import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import { TSearchResult, TMultiSearch } from '@src/store/modules/search/types'
import { ListItemIcon, Typography } from '@material-ui/core'
import TvIcon from '@material-ui/icons/Tv'
import MovieIcon from '@material-ui/icons/Movie'
import PersonIcon from '@material-ui/icons/Person'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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
  onRedirect: () => void
}
export const SearchResultsList: React.FC<T> = ({
  isOpened,
  results,
  onRedirect,
}) => {
  const classes = useStyles()
  const history = useHistory()
  const [t] = useTranslation()
  return (
    <>
      {isOpened && (
        <List className={classes.root}>
          {results?.total_results ? (
            results?.results?.map((media) => {
              return (
                <ListItem
                  key={media.id}
                  role={undefined}
                  dense
                  button
                  onClick={() => {
                    onRedirect()
                    history.push(getUrl(media))
                  }}
                >
                  <ListItemIcon>{getIcon(media)}</ListItemIcon>
                  <ListItemText
                    style={{ marginTop: 0 }}
                    primary={`${getTitle(media)}`}
                  />
                  <ListItemSecondaryAction></ListItemSecondaryAction>
                </ListItem>
              )
            })
          ) : (
            <Typography style={{ textAlign: 'center' }} variant="h5">
              {t('search panel no-results')}
            </Typography>
          )}
        </List>
      )}
    </>
  )
}
const getTitle = (media: TMultiSearch) => {
  switch (media.media_type) {
    case 'movie':
      return `${media.title} (Movie) ${
        media.release_date ? new Date(media.release_date).getFullYear() : ''
      }`
    case 'tv':
      return `${media.name} (TV) ${
        media.first_air_date ? new Date(media.first_air_date).getFullYear() : ''
      }`
    default:
      return 'N/A (Persona)'
  }
}
const getIcon = (media: TMultiSearch) => {
  switch (media.media_type) {
    case 'movie':
      return <MovieIcon />
    case 'tv':
      return <TvIcon />
    default:
      return <PersonIcon />
  }
}

const getUrl = (media: TMultiSearch) => {
  switch (media.media_type) {
    case 'movie':
      return '/movies/' + media.id
    case 'tv':
      return '/tv/' + media.id
    default:
      return ''
  }
}
