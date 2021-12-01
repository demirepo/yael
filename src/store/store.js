import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import ajaxSlice from "./ajaxSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    ajax: ajaxSlice,
  },
});
