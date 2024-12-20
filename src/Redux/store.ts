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
import storage from "redux-persist/lib/storage"; 
import { productReducer } from "./Slice/Product.slice";
import { spinnerReducer } from "./Slice/spinner.slice";
import { userReducer } from "./Slice/user.slice";
import { sellerReducer } from "./Slice/seller.slice";
import { petReducer } from "./Slice/Pet.slice";
import { carouselReducer } from "./Slice/carousel.slice";
import { themeReducer } from "./Slice/theme.slice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducers);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    products: productReducer,
    pets: petReducer,
    spinner: spinnerReducer,
    user: userReducer,
    seller: sellerReducer,
    carousel:carouselReducer,
    theme:themeReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
