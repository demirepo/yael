import { wordApi } from "../api/api";
import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    showModal: false,
    word: {},
  },
  reducers: {
    toggleModal: (state) => {
      state.showModal = state.showModal ? false : true;
    },
    setTrans: (state, action) => {
      state.word.examples = action.payload;
    },
  },
});

export const { actions, reducer } = modalSlice;
export const { toggleModal, setTrans } = actions;
export default reducer;

export const dictLookup = (text, sid, yu, yum) => async (dispatch) => {
  const response = await wordApi.getTrans(text, sid, yu, yum);
  dispatch(setTrans(response));
  console.log(response);
};
