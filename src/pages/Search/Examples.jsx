import React from 'react';
import { Button, Chip, Grid, Stack, Typography } from '@mui/material';

const Examples = ({ examples }) => {
  const [show, setShow] = React.useState(10);
  const [selectedChip, setSelectedChip] = React.useState(-1);

  const selectChip = (e) => {
    setSelectedChip(+e.target.closest('.MuiChip-root').id);
  };

  return (
    <div>
      <Stack>
        <Grid mb={4} gap={'10px'}>
          {/* ------------------------    первый таб */}

          <Chip
            item='true'
            id={-1}
            label={'Все'}
            key={'all-translations'}
            variant={selectedChip === -1 ? 'filled' : 'outlined'}
            sx={{ cursor: 'pointer' }}
            onClick={selectChip}
          />

          {/* ------------------------    остальные табы */}

          {examples.tabs.map((el, index) => {
            return (
              <Chip
                item='true'
                id={index}
                label={
                  el.translation.other
                    ? 'другие переводы'
                    : el.translation.idiom
                    ? 'идиомы'
                    : el.translation.text
                }
                key={el.index}
                variant={selectedChip === index ? 'filled' : 'outlined'}
                sx={{ cursor: 'pointer' }}
                onClick={selectChip}
              />
            );
          })}
        </Grid>

        {/* ------------------------    список примеров */}

        <ul key={'examples'} style={{ listStyle: 'none' }}>
          {examples.examples
            .filter((el, index) => {
              if (selectedChip === -1 && index <= show) {
                return 1;
              } else {
                return el.tabIndex === selectedChip && index <= show;
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

        <Button variant='contained' onClick={() => setShow(show + 10)}>
          Показать еще
        </Button>
      </Stack>
    </div>
  );
};

export default Examples;
