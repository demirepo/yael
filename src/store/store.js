import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import ajaxSlice from "./ajaxSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    ajax: ajaxSlice,
    user: userSlice,
  },
});
