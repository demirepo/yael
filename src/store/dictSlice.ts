import { wordApi } from '../api/api';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from './store';

interface IDict {
  translation: Object;
  examples: Object;
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

export const { actions, reducer } = dictSlice;

export const { setTranslation, setExamples } = actions;

export default reducer;

export const getTranslationThunk =
  (text: string, sid: string) => async (dispatch: AppDispatch) => {
    const translation = await wordApi.getTrans(text, sid);
    await dispatch(setTranslation(translation));
  };

export const getExamplesThunk =
  (text: string, sid: string) => async (dispatch: AppDispatch) => {
    const examples = await wordApi.getExamples(text, sid);
    await dispatch(setExamples(examples));
  };
