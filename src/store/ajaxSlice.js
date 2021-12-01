import { createSlice } from "@reduxjs/toolkit";
import * as session from "./credentials";

const ajaxSlice = createSlice({
  name: "ajax",

  initialState: {
    sid: session.sid,
    yu: session.yu,
    yum: session.yum,
  },

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
