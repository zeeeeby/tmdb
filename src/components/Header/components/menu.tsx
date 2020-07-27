import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { auth } from '@src/store/modules/auth';
import { account } from '@src/store/modules/account';

export const FadeMenu = (props: { avatarLink: string | undefined }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { signOut } = auth.useActions();
  const { dropProfile } = account.useActions();

  const onSignOutClick = async () => {
    try {
      await signOut();
      await dropProfile();
    } catch (err) {}
  };
  return (
    <div>
      <Avatar
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        src={props.avatarLink}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={onSignOutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
