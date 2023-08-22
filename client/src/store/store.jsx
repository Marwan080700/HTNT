import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../Slice/productSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
  },
});
