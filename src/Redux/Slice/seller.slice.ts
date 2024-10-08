// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Seller } from '../../types/seller.types';
// interface SellerState {
//     sellers: Seller[];
//     loading: boolean;
//     error: string | null;
// }

// const initialState: SellerState = {
//     sellers: [],
//     loading: false,
//     error: null,
// };

// const sellerSlice = createSlice({
//     name: 'seller',
//     initialState,
//     reducers: {
//         setSellers: (state, action: PayloadAction<Seller[]>) => {
//             state.sellers = action.payload;
//         },
//     },
// });

// export const { setSellers } = sellerSlice.actions;
// export const  sellerReducer = sellerSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Seller } from '../../types/seller.types';

interface SellerState {
    sellers: Seller[];
    loading: boolean;
    error: string | null;
}

const initialState: SellerState = {
    sellers: [],
    loading: false,
    error: null,
};

const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {
        setSellers: (state, action: PayloadAction<Seller[]>) => {
            state.sellers = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setSellers, setLoading, setError } = sellerSlice.actions;
export const sellerReducer = sellerSlice.reducer;
