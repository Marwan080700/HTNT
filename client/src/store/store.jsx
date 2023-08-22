import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../Slice/productSlice";
import authSlice from "../Slice/authSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    user: authSlice,
  },
});
