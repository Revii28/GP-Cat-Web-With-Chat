import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cats: [],
};

export const catSlice = createSlice({
  name: "cat",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setCats: (state, { payload }) => {
      state.cats = payload;
    },
  },
});

export const { setLoading, setCats } = catSlice.actions;

export default catSlice.reducer;
