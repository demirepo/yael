import { wordApi } from '../api/api';
import { createSlice } from '@reduxjs/toolkit';

const dictSlice = createSlice({
  name: 'translation',

  initialState: {
    translation: {},
    examples: {},
  },

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

export const getTranslationThunk = (text, sid, yu, yum) => async (dispatch) => {
  const translation = await wordApi.getTrans(text, sid, yu, yum);
  await dispatch(setTranslation(translation));
};

export const getExamplesThunk = (text, sid, yu) => async (dispatch) => {
  const examples = await wordApi.getExamples(text, sid, yu);
  await dispatch(setExamples(examples));
};
