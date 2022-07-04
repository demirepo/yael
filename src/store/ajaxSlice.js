import { createSlice } from "@reduxjs/toolkit";

const ajaxSlice = createSlice({
  name: "ajax",

  initialState: {
    sid: process.env.REACT_APP_SID,
    yu: process.env.REACT_APP_YU,
    yum: process.env.REACT_APP_YUM,
  },

  reducers: {
    setSession: (state, action) => {
      console.log(action.payload.sid);
      state.sid = action.payload.sid;
      state.yu = action.payload.yu;
      state.yum = action.payload.yum;
    },
  },
});

export const { actions, reducer } = ajaxSlice;
export const { setSession } = actions;
export default reducer;
