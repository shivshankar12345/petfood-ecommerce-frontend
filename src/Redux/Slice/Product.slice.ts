import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product.types";

interface ProductState {
  products: Product[];
  loading : boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null
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

    setloading:(state, action:PayloadAction<boolean>)=>{
      state.loading = action.payload
    },

    setError:(state, action:PayloadAction<string | null>) =>{
      state.error = action.payload
    }
  },
});

export const { addProduct, setProducts,setError } = productSlice.actions;

export const productReducer = productSlice.reducer;
