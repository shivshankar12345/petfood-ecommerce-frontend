import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IntialState } from "../../types/login.types";

const INITIAL_STATE: IntialState = {
  accessToken: "",
  refreshToken: "",
  role: "",
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setAccessToken: (
      state: IntialState,
      action: PayloadAction<{ accessToken: string }>
    ) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      state.isAuth = true;
    },
    setRefreshToken: (
      state: IntialState,
      action: PayloadAction<{ refreshToken: string }>
    ) => {
      const { refreshToken } = action.payload;
      state.refreshToken = refreshToken;
    },
    setRole: (state: IntialState, action: PayloadAction<{ role: string }>) => {
      const { role } = action.payload;
      state.role = role;
    },
    clearAccessToken: (state: IntialState) => {
      state.accessToken = "";
      state.isAuth = false;
    },
    clearRefreshToken: (state: IntialState) => {
      state.refreshToken = "";
    },
    clearRole: (state: IntialState) => {
      state.role = "";
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  clearAccessToken,
  clearRefreshToken,
  setRole,
  clearRole,
} = authSlice.actions;
export const authReducers = authSlice.reducer;
