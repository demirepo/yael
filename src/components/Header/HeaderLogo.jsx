import React from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import { Typography } from '@mui/material';

const Logo = () => {
  return (
    <>
      <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Typography
        variant='h6'
        noWrap
        component='a'
        href='/'
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'roboto',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        YanLeo
      </Typography>
    </>
  );
};

export default Logo;
