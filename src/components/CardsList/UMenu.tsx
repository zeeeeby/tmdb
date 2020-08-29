import React from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useMenu } from '@src/hooks/useMenu'
import { Menu, MenuItem } from '@material-ui/core'
import { account } from '@src/store/modules/account'
import { TAccountStates } from '@src/store/modules/account/types'
import { tvApi, moviesApi } from '@src/api'
import { useTranslation } from 'react-i18next'

type T = {
  type: 'movie' | 'tv'
  id: number
}
export const UMenu: React.FC<T> = ({ type, id }) => {
  const [anchorEl, open, close] = useMenu()
  const [state, setState] = React.useState<TAccountStates>()

  const handleMenuClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    open(e)
  }

  const { addToFavoriteList, addToWatchList } = account.useActions()

  const [t, i18n] = useTranslation()
  React.useEffect(() => {
    if (type === 'movie')
      moviesApi.getAccountStates(id).then((res) => setState(res as any))
    else tvApi.getAccountStates(id).then((res) => setState(res as any))
  }, [i18n.language])
  const params = { media_id: id, media_type: type }

  const onWatchListClick = async () => {
    if (!state) return
    if (state?.watchlist) {
      await addToWatchList({ ...params, watchlist: false })
    } else await addToWatchList({ ...params, watchlist: true })

    await setState({ ...state, watchlist: !state?.watchlist })
    close()
  }
  const onFavoriteListClick = async () => {
    if (!state) return
    if (state?.favorite) {
      await addToFavoriteList({ ...params, favorite: false })
    } else await addToFavoriteList({ ...params, favorite: true })
    await setState({ ...state, favorite: !state?.favorite })
    close()
  }

  return (
    <>
      <div
        style={{ position: 'absolute', bottom: '2%', right: '5%' }}
        onClick={handleMenuClick}
      >
        <MoreVertIcon />
      </div>
      <Menu
        id="m-card-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={close}
      >
        <MenuItem onClick={onWatchListClick}>
          {state?.watchlist
            ? t('remove from watchlist')
            : t('add to watchlist')}
        </MenuItem>
        <MenuItem onClick={onFavoriteListClick}>
          {state?.favorite
            ? t('remove from favoritelist')
            : t('add to favoritelist')}
        </MenuItem>
      </Menu>
    </>
  )
}
