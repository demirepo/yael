import React, {MouseEvent} from 'react';
import {Button, Chip, Grid, Stack, Typography} from '@mui/material';

interface ExamplesProps {
  tabs: any;
  examples: any;
}

function Examples({examples}: ExamplesProps) {
  const [show, setShow] = React.useState(10);
  const [selectedChip, setSelectedChip] = React.useState(-1);

  const selectChip = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('.MuiChip-root')) {
      const root = target.closest('.MuiChip-root');
      if (root) setSelectedChip(+root.id);
    }
  };

  return (
    <div>
      <Stack>
        <Grid mb={4} gap='10px'>
          {/* ------------------------    первый таб */}
          <Chip
            id='n-1'
            label='Все'
            key='all-translations'
            variant={selectedChip === -1 ? 'filled' : 'outlined'}
            sx={{cursor: 'pointer'}}
            onClick={selectChip}
          />
          {/* ------------------------    остальные табы */}
          {examples.tabs.map((el: any, index: number) => {
            return (
              <Chip
                id={`n${index}`}
                label={
                  // eslint-disable-next-line no-nested-ternary
                  el.translation.other
                    ? 'другие переводы'
                    : el.translation.idiom
                    ? 'идиомы'
                    : el.translation.text
                }
                key={el.index}
                variant={selectedChip === index ? 'filled' : 'outlined'}
                sx={{cursor: 'pointer'}}
                onClick={selectChip}
              />
            );
          })}
        </Grid>

        {/* ------------------------    список примеров */}

        <ul key='examples' style={{listStyle: 'none'}}>
          {examples.examples
            .filter((el: any, index: number) => {
              if (selectedChip === -1 && index <= show) {
                return 1;
              }
              return el.tabIndex === selectedChip && index <= show;
            })
            .map((item: any) => {
              return (
                <li key={item.id} style={{marginBottom: '20px'}}>
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
}

export default Examples;
