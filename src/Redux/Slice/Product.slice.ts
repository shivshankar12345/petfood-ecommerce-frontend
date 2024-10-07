import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product.types";

interface ProductState {
  products: (Product)[];
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
    updateProduct: (
      state,
      action: PayloadAction<Product>
    ) => {
      const index = state.products.findIndex(
        product => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        product => product.id !== action.payload
      );
    },
    setProducts: (
      state,
      action: PayloadAction<(Product)[]>
    ) => {
      state.products = action.payload;
    },
  },
});

export const { addProduct, updateProduct, setProducts, deleteProduct } =
  productSlice.actions;
export const productReducer = productSlice.reducer;
