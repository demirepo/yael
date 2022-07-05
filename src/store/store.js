import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './modalSlice';
import ajaxSlice from './sessionSlice';
import userSlice from './userSlice';
import dictSlice from './dictSlice';

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    ajax: ajaxSlice,
    user: userSlice,
    dict: dictSlice,
  },
});
