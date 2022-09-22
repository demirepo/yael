import React from 'react';
import Container from '@mui/material/Container';

import {useSelector} from 'react-redux';

import {getTranslationThunk, getExamplesThunk} from '../../store/dictSlice';

import {getHighlightedFragment} from '../../helpers/getHighlighted';

import * as dictSelectors from '../../store/dictSelectors';

import {useAppDispatch} from '../../hooks/redux';

import QueryInput from './QueryInput';
import Examples from './Examples';

function Search() {
  const [query, setQuery] = React.useState('');

  const dispatch = useAppDispatch();

  // const translation = useSelector(getTranslation);
  const examples = useSelector(dictSelectors.getExamples);
  const session = useSelector(dictSelectors.getSession);

  const examplesRef = React.useRef();

  const handleClick = () => {
    if (query === '') return;
    dispatch(getTranslationThunk(query, session));
    dispatch(getExamplesThunk(query, session));
  };

  const showExamples = examples.examples && examples.examples.length !== 0;

  React.useEffect(() => {
    const examples = examplesRef.current?.children;
    if (examples) {
      for (const example of examples) {
        for (const el of example.children) {
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
      <QueryInput query={query} setQuery={setQuery} handleClick={handleClick} />
      {showExamples && <Examples examples={examples} />}
    </Container>
  );
}

export default Search;
