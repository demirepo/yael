import React from 'react';
import { Box } from '@mui/material';
import { IconButton } from '@mui/material';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

const HeaderMenu = ({ handleOpenNavMenu, anchorElNav, handleCloseNavMenu }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleOpenNavMenu}
          color='inherit'
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id='menu-appbar'
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          <MenuItem key={'Поиск'} onClick={handleCloseNavMenu}>
            <Typography textAlign='center'>{'Поиск'}</Typography>
          </MenuItem>
          <MenuItem key={'Словарь'} onClick={handleCloseNavMenu}>
            <Typography textAlign='center'>{'Словарь'}</Typography>
          </MenuItem>
          <MenuItem key={'Тренировки'} onClick={handleCloseNavMenu}>
            <Typography textAlign='center'>{'Тренировки'}</Typography>
          </MenuItem>
        </Menu>
      </Box>
      <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
    </>
  );
};

export default HeaderMenu;
