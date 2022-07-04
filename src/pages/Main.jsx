import React from 'react';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';

const Main = () => {
  return (
    <>
      <Container
        maxWidth='md'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          // alignItems: 'center',
          height: '100vh',
          pt: '30%',
        }}
      >
        <TextField
          fullWidth
          helperText={'Введите слово для перевода'}
        ></TextField>
      </Container>
    </>
  );
};

export default Main;
