import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';

const HeaderAvatarMenu = ({
  handleOpenUserMenu,
  anchorElUser,
  handleCloseUserMenu,
  handleLogout,
}) => {
  return (
    <div>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title='Open settings'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt='Demi' src='/static/images/avatar/2.jpg' />
          </IconButton>
        </Tooltip>

        <Menu
          sx={{ mt: '45px' }}
          id='menu-appbar'
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem key={'logout'} onClick={handleCloseUserMenu}>
            <Typography onClick={handleLogout} textAlign='center'>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
};

export default HeaderAvatarMenu;
