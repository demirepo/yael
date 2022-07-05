import React from 'react';
import Container from '@mui/material/Container';
import { Button, Chip, Grid, Stack, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getTranslationThunk } from '../store/dictSlice';
import { useSelector } from 'react-redux';
import { getExamplesThunk } from './../store/dictSlice';
import Typography from '@mui/material/Typography';

const Main = () => {
  const [query, setQuery] = React.useState('');
  const [selectedChip, setSelectedChip] = React.useState(0);

  const dispatch = useDispatch();

  const translation = useSelector((state) => state.dict.translation);
  const examples = useSelector((state) => state.dict.examples);
  const session = useSelector((state) => {
    return { sid: state.ajax.sid, yu: state.ajax.yu, yum: state.ajax.yum };
  });

  const handleClick = () => {
    dispatch(getTranslationThunk(query, session));
    dispatch(getExamplesThunk(query, session));
  };

  const selectChip = (e) => {
    setSelectedChip(+e.target.closest('.MuiChip-root').id);
  };

  return (
    <Container
      maxWidth='md'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
        // height: '100vh',
        mt: '50px',
        mb: '50px',
      }}
    >
      <Grid
        component={'form'}
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
        sx={{ display: 'flex', alignContent: 'center' }}
      >
        <TextField
          value={query}
          fullWidth
          onChange={(e) => setQuery(e.target.value)}
          helperText={'Введите слово для перевода'}
          autoComplete='off'
        ></TextField>
        <Button
          sx={{ alignSelf: 'start', padding: '16.5px' }}
          onClick={handleClick}
        >
          Перевести
        </Button>
      </Grid>
      <Stack>
        <Grid gap={'10px'}>
          {examples.examples && (
            <Chip
              item='true'
              id={0}
              label={'Все'}
              key={'other'}
              variant={selectedChip === 0 ? 'filled' : 'outlined'}
              sx={{ cursor: 'pointer' }}
              onClick={selectChip}
            />
          )}

          {examples.tabs &&
            examples.tabs.map((el, index) => {
              return (
                <Chip
                  item='true'
                  id={index + 1}
                  label={
                    el.translation.text
                      ? el.translation.text
                      : 'прочие переводы'
                  }
                  key={el.index + 1}
                  variant={selectedChip === index + 1 ? 'filled' : 'outlined'}
                  sx={{ cursor: 'pointer' }}
                  onClick={selectChip}
                />
              );
            })}
        </Grid>
        <ul style={{ listStyle: 'none' }}>
          {examples.examples &&
            examples.examples
              .filter((el) => {
                if (selectedChip === 0) {
                  return 1;
                } else {
                  return el.tabIndex + 1 === selectedChip;
                }
              })
              .map((item) => {
                return (
                  <li key={item.id} style={{ marginBottom: '20px' }}>
                    <Typography component='h5' variant='h6'>
                      {item.src}
                    </Typography>
                    <Typography component='h6'>{item.dst}</Typography>
                  </li>
                );
              })}
        </ul>
      </Stack>
    </Container>
  );
};

export default Main;
