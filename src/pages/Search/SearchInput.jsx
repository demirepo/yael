import React from 'react';
import { Button, Grid, TextField } from '@mui/material';

const SearchInput = ({ handleClick, setQuery, query }) => {
  return (
    <div>
      <Grid
        component={'form'}
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
        sx={{ display: 'flex', alignContent: 'center' }}
        mb={2}
      >
        <TextField
          value={query}
          fullWidth
          onChange={(e) => setQuery(e.target.value)}
          helperText={'Введите слово для перевода'}
          autoComplete='off'
          autoFocus
        ></TextField>
        <Button
          sx={{ alignSelf: 'start', padding: '16.5px' }}
          onClick={handleClick}
        >
          Перевести
        </Button>
      </Grid>
    </div>
  );
};

export default SearchInput;
