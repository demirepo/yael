import { createSlice } from '@reduxjs/toolkit';

interface IAjax {
  sid: string | undefined;
  yu: string | undefined;
  yum: string | undefined;
}

const initialState: IAjax = {
  sid: process.env.REACT_APP_SID,
  yu: process.env.REACT_APP_YU,
  yum: process.env.REACT_APP_YUM,
};

const ajaxSlice = createSlice({
  name: 'ajax',
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.sid = action.payload.sid;
      state.yu = action.payload.yu;
      state.yum = action.payload.yum;
    },
  },
});

export const { actions, reducer } = ajaxSlice;
export const { setSession } = actions;
export default reducer;
