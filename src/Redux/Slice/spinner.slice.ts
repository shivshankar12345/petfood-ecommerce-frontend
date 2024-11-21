import { createSlice } from "@reduxjs/toolkit";

interface SpinnerState {
  loading: boolean;
}

const initialState: SpinnerState = {
  loading: false,
};

const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { startLoading, stopLoading } = spinnerSlice.actions;
export const spinnerReducer = spinnerSlice.reducer;
