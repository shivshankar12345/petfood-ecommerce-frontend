// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./Slice/auth.slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { productReducer } from "./Slice/Product.slice";
import { spinnerReducer } from "./Slice/spinner.slice";
import { userReducer } from "./Slice/user.slice";
import { sellerReducer } from "./Slice/seller.slice";
import { petReducer } from "./Slice/Pet.slice";
import { carouselReducer } from "./Slice/carousel.slice";

// Persist Configuration
const persistConfig = {
  key: "root",
  storage,
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, authReducers);

// Configure Store
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    products: productReducer,
    pets: petReducer,
    spinner: spinnerReducer,
    user: userReducer,
    seller: sellerReducer,
    carousel:carouselReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persist Store
export const persister = persistStore(store);

// Type Definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
