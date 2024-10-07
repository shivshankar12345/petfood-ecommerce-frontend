// src/Redux/Slice/Product.slice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product.types";

interface ProductState {
  products: Product[];
}

// Initial state of the products
const initialState: ProductState = {
  products: [],
};

// Create the product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Action to add a new product
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    // Action to update an existing product
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload; // Update the product
      }
    },
    // Action to delete a product by id
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    // Action to set the entire products list
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload; // Set products to the provided list
    },
  },
});

// Export actions for use in components
export const { addProduct, updateProduct, setProducts, deleteProduct } = productSlice.actions;

// Export the reducer to be used in the store
export const productReducer = productSlice.reducer;
