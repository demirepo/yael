import {createSlice} from '@reduxjs/toolkit';

import {wordApi} from '../api/api';

import {AppDispatch} from './store';

interface IDict {
  translation: any;
  examples: any;
  error: string;
  isFetching: boolean;
}

const initialState: IDict = {
  translation: {},
  examples: {},
  error: '',
  isFetching: false,
};

const dictSlice = createSlice({
  name: 'dict',
  initialState,
  reducers: {
    setExamples: (state, action) => {
      state.examples = action.payload.result;
    },
    setTranslation: (state, action) => {
      state.translation = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const {actions, reducer} = dictSlice;

export const {setTranslation, setExamples, setError, setFetching} = actions;

export default reducer;

export const getTranslationThunk =
  (text: string, sid: string) => async (dispatch: AppDispatch) => {
    dispatch(setFetching(true));
    try {
      const translation = await wordApi.getTrans(text, sid);
      dispatch(setTranslation(translation));
      dispatch(setFetching(false));
    } catch (error) {
      setError(`Error while getting translation`);
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

export const getExamplesThunk =
  (text: string, sid: string) => async (dispatch: AppDispatch) => {
    dispatch(setFetching(true));
    try {
      const examples = await wordApi.getExamples(text, sid);
      dispatch(setExamples(examples));
      dispatch(setFetching(false));
    } catch (error) {
      setError(`Error while getting examples`);
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
