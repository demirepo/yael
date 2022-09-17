import { wordApi } from '../api/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store';

export interface IModal {
  showContextModal: boolean;
  showSettingsModal: boolean;
  buttonMenu: boolean;
  word: { examples: any };
}

const initialState: IModal = {
  showContextModal: false,
  showSettingsModal: false,
  buttonMenu: false,
  word: { examples: [] },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleContextModal: (state) => {
      state.showContextModal = state.showContextModal ? false : true;
    },
    toggleSettingsModal: (state) => {
      state.showSettingsModal = state.showSettingsModal ? false : true;
    },
    activateButtonMenu: (state) => {
      state.buttonMenu = true;
    },
    deactivateButtonMenu: (state) => {
      state.buttonMenu = false;
    },
    setTrans: (state, action: PayloadAction<string>) => {
      state.word.examples = action.payload;
    },
  },
});

export const { actions, reducer } = modalSlice;

export default modalSlice.reducer;

export const getTranslation =
  (text: string, sid: string) => async (dispatch: AppDispatch) => {
    const data = await wordApi.getTrans(text, sid);
    dispatch(modalSlice.actions.setTrans(data));
  };
