// src/Redux/Slice/Carousel.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Carousel } from "../../types/Carousel.types";

interface CarouselState {
  carousels: Carousel[];
  loading: boolean;
  error: string | null;
}

const initialState: CarouselState = {
  carousels: [],
  loading: false,
  error: null,
};

const carouselSlice = createSlice({
  name: "carousels",
  initialState,
  reducers: {
    setCarousels: (state, action: PayloadAction<Carousel[]>) => {
      state.carousels = action.payload;
    },
    addCarousel: (state, action: PayloadAction<Carousel>) => {
      state.carousels.push(action.payload);
    },
    updateCarousel: (state, action: PayloadAction<Carousel>) => {
      const index = state.carousels.findIndex(
        (carousel) => carousel.id === action.payload.id
      );
      if (index !== -1) {
        state.carousels[index] = action.payload;
      }
    },
    deleteCarousel: (state, action: PayloadAction<string>) => {
      state.carousels = state.carousels.filter(
        (carousel) => carousel.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCarousels,
  addCarousel,
  updateCarousel,
  deleteCarousel,
  setLoading,
  setError,
} = carouselSlice.actions;


export const carouselReducer = carouselSlice.reducer;
