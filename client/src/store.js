import { configureStore } from "@reduxjs/toolkit";
import catReducer from "./features/cats/catSlice";

export default configureStore({
  reducer: {
    cats: catReducer,
  },
});
