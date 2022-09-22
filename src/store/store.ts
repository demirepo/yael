import {combineReducers, configureStore} from '@reduxjs/toolkit';

import modalSlice from './modalSlice';
import ajaxSlice from './sessionSlice';
import userSlice from './userSlice';
import dictSlice from './dictSlice';
import settingsSlice from './settingsSlice';

const rootReducer = combineReducers({
  modal: modalSlice,
  ajax: ajaxSlice,
  user: userSlice,
  dict: dictSlice,
  settings: settingsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
