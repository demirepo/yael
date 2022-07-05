import React from 'react';
import Container from '@mui/material/Container';
import { Button, Chip, Grid, Stack, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getTranslationThunk } from '../../store/dictSlice';
import { useSelector } from 'react-redux';
import { getExamplesThunk } from '../../store/dictSlice';
import Typography from '@mui/material/Typography';
import { getHighlightedFragment } from '../../helpers/getHighlighted';
import SearchInput from './SearchInput';

const Search = () => {
  const [query, setQuery] = React.useState('');
  const [show, setShow] = React.useState(10);
  const [selectedChip, setSelectedChip] = React.useState(-1);

  const dispatch = useDispatch();

  const translation = useSelector((state) => state.dict.translation);
  const examples = useSelector((state) => state.dict.examples);
  const session = useSelector((state) => {
    return { sid: state.ajax.sid, yu: state.ajax.yu, yum: state.ajax.yum };
  });

  const examplesRef = React.useRef();

  const handleClick = () => {
    if (query === '') return;
    dispatch(getTranslationThunk(query, session));
    dispatch(getExamplesThunk(query, session));
  };

  const selectChip = (e) => {
    setSelectedChip(+e.target.closest('.MuiChip-root').id);
  };

  const showExamples = examples.examples && examples.examples.length !== 0;

  React.useEffect(() => {
    const examples = examplesRef.current.children;
    if (examples) {
      for (let example of examples) {
        for (let el of example.children) {
          el.innerHTML = getHighlightedFragment(el.innerText);
        }
      }
    }
  });

  return (
    <Container
      maxWidth='md'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        mt: '50px',
      }}
    >
      <SearchInput
        query={query}
        setQuery={setQuery}
        handleClick={handleClick}
      />
      <Stack>
        <Grid mb={4} gap={'10px'}>
          {showExamples && (
            <Chip
              item='true'
              id={-1}
              label={'Все'}
              key={'all-translations'}
              variant={selectedChip === -1 ? 'filled' : 'outlined'}
              sx={{ cursor: 'pointer' }}
              onClick={selectChip}
            />
          )}

          {showExamples &&
            examples.tabs.map((el, index) => {
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
        <ul key={'examples'} ref={examplesRef} style={{ listStyle: 'none' }}>
          {showExamples &&
            examples.examples
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
        {showExamples && (
          <Button variant='contained' onClick={() => setShow(show + 10)}>
            Показать еще
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default Search;
