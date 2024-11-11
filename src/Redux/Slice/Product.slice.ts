import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product.types";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },

    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addProduct, setProducts } = productSlice.actions;

export const productReducer = productSlice.reducer;
