import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

function HeaderUserMenu({
  handleOpenUserMenu,
  anchorElUser,
  handleCloseUserMenu,
  handleLogout,
  handleOpenSettingsModal,
}) {
  return (
    <div>
      <Box sx={{flexGrow: 0}}>
        <Tooltip title='Open settings'>
          <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
            <Avatar alt='Demi' src='/static/images/avatar/2.jpg' />
          </IconButton>
        </Tooltip>

        <Menu
          sx={{mt: '45px'}}
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
          <MenuItem key='settings' onClick={handleOpenSettingsModal}>
            <SettingsIcon sx={{mr: 1}} />
            <Typography textAlign='center'>Настройки</Typography>
          </MenuItem>
          <MenuItem key='logout' onClick={handleLogout}>
            <LogoutIcon sx={{mr: 1}} />
            <Typography textAlign='center'>Выйти</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
}

export default HeaderUserMenu;
