import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import { auth } from '@src/store/modules/auth'
import { account } from '@src/store/modules/account'
import { useMenu } from '@src/hooks/useMenu'
import { useHistory } from 'react-router-dom'

export const FadeMenu = (props: { avatarLink: string | undefined }) => {
  const { signOut } = auth.useActions()
  const { dropProfile } = account.useActions()

  const history = useHistory()
  const [anchorEl, open, close] = useMenu()

  const onSignOutClick = async () => {
    try {
      await signOut()
      await dropProfile()
    } catch (err) {}
  }
  const onProfileClick = () => {
    close()
    history.push("/profile/")
  }
  return (
    <div>
      <Avatar
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={open}
        src={props.avatarLink}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={close}
      >
        <MenuItem onClick={onProfileClick}>Profile</MenuItem>
        <MenuItem onClick={onSignOutClick}>Logout</MenuItem>
      </Menu>
    </div>
  )
}
