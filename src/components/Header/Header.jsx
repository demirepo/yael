import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {getAuth, signOut} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

import SettingsModal from '../SettingsModal/SettingsModal';

import {useAppSelector} from '../../hooks/redux';

import {getServerAddress} from '../../store/settingsSelectors';

import HeaderLogo from './HeaderLogo';
import HeaderMenu from './HeaderMenu';
import HeaderLinks from './HeaderLinks';
import HeaderUserMenu from './HeaderUserMenu';

function Header({isAuth}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showSettingsModal, setShowSettingsModal] = React.useState(false);

  const serverAddress = useAppSelector(getServerAddress);

  const navigate = useNavigate();

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Redirect to main');
        navigate('/search');
      })
      .catch((error) => {
        console.log('Error while logging out', error.message);
      });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  const handleOpenSettingsModal = () => {
    setShowSettingsModal(true);
    handleCloseUserMenu();
  };
  const handleCloseSettingsModal = () => {
    setShowSettingsModal(false);
    handleCloseUserMenu();
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <HeaderLogo />

          <HeaderMenu
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
            anchorElNav={anchorElNav}
          />

          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: {xs: 'flex', md: 'none'},
              flexGrow: 1,
              fontFamily: 'roboto',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            YanLeo
          </Typography>

          <HeaderLinks handleCloseNavMenu={handleCloseNavMenu} />

          <HeaderUserMenu
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
            anchorElUser={anchorElUser}
            handleLogout={handleLogout}
            handleOpenSettings={handleOpenSettingsModal}
            handleOpenSettingsModal={handleOpenSettingsModal}
          />
        </Toolbar>
      </Container>

      <SettingsModal
        showSettingsModal={showSettingsModal}
        handleCloseSettingsModal={handleCloseSettingsModal}
        serverAddress={serverAddress}
      />
    </AppBar>
  );
}
export default Header;
