/* eslint no-param-reassign: 0 */

import {createSlice} from '@reduxjs/toolkit';

interface ISettings {
  serverAddress: string;
}

const initialState: ISettings = {
  serverAddress: '192.168.1.2',
};

const userSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setServerAddress: (state, action) => {
      state.serverAddress = action.payload;
    },
  },
});

export const {actions, reducer} = userSlice;
export const {setServerAddress} = actions;
export default reducer;
