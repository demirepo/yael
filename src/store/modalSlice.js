import { wordApi } from '../api/api';
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',

  initialState: {
    showContextModal: false,
    showSettingsModal: false,
    buttonMenu: false,
    word: {},
  },

  reducers: {
    toggleContextModal: (state) => {
      state.showContextModal = state.showContextModal ? false : true;
    },
    toggleSettingsModal: (state) => {
      state.showSettingsModal = state.showSettingsModal ? false : true;
    },
    activateButtonMenu: (state) => {
      state.buttonMenu = state.buttonMenu = true;
    },
    deactivateButtonMenu: (state) => {
      state.buttonMenu = state.buttonMenu = false;
    },
    setTrans: (state, action) => {
      state.word.examples = action.payload;
    },
  },
});

export const { actions, reducer } = modalSlice;

export const {
  toggleSettingsModal,
  toggleContextModal,
  activateButtonMenu,
  deactivateButtonMenu,
  setTrans,
} = actions;

export default reducer;

export const getTranslation = (text, sid, yu, yum) => async (dispatch) => {
  const data = await wordApi.getTrans(text, sid, yu, yum);
  dispatch(setTrans(data));
};
