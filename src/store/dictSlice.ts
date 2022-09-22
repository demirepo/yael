/* eslint no-param-reassign: 0 */

import {createSlice} from '@reduxjs/toolkit';

import {wordApi} from '../api/api';

import {AppDispatch} from './store';

interface IDict {
  translation: any;
  examples: any;
}

const initialState: IDict = {
  translation: {},
  examples: {},
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
  },
});

export const {actions, reducer} = dictSlice;

export const {setTranslation, setExamples} = actions;

export default reducer;

export const getTranslationThunk =
  (text: string, sid: string) => async (dispatch: AppDispatch) => {
    try {
      const translation = await wordApi.getTrans(text, sid);
      dispatch(setTranslation(translation));
    } catch (error) {
      console.log('Error while getting translation: ', error);
    }
  };

export const getExamplesThunk =
  (text: string, sid: string) => async (dispatch: AppDispatch) => {
    try {
      const examples = await wordApi.getExamples(text, sid);
      dispatch(setExamples(examples));
    } catch (error) {
      console.log('Error while getting examples: ', error);
    }
  };
