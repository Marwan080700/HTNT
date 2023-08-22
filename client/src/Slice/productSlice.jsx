import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API } from "../config/api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await API.get("/products");
    return response.data.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ formData, config }) => {
    try {
      const response = await API.post("/product", formData, config);
      toast.success("Add product success", {
        position: "bottom-right",
        autoClose: 3000, // Set the duration for the toast to be visible
      });
      return response.data.data;
    } catch (error) {
      toast.error(
        "Image format must be JPG and PNG, maximum 100KB, and product name must be unique.",
        {
          position: "bottom-right",
          autoClose: 5000,
        }
      );
      throw error; // Make sure to re-throw the error so that it can be caught by the component
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData, config }) => {
    try {
      const response = await API.patch(`/product/${id}`, formData, config);
      toast.success("Update product success", {
        position: "bottom-right",
        autoClose: 3000, // Set the duration for the toast to be visible
      });
      return response.data.data;
    } catch (error) {
      toast.error(
        "Image format must be JPG and PNG, maximum 100KB, product name must be unique and image must be filled in.",
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
      throw error;
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await API.delete(`/product/${id}`);
    toast.success("Delete successfully", {
      position: "bottom-right",
      autoClose: 3000, // Set the duration for the toast to be visible
    });
    return id;
  }
);

const productEntity = createEntityAdapter({
  selectId: (product) => product.id,
});

const productSlice = createSlice({
  name: "product",
  initialState: productEntity.getInitialState(),
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      productEntity.setAll(state, action.payload);
    },
    [addProduct.fulfilled]: (state, action) => {
      productEntity.addOne(state, action.payload);
    },
    [deleteProduct.fulfilled]: (state, action) => {
      productEntity.removeOne(state, action.payload);
    },
    [updateProduct.fulfilled]: (state, action) => {
      productEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
  },
});

export const productSelectors = productEntity.getSelectors(
  (state) => state.product
);
export default productSlice.reducer;
