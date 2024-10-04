// src/features/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {User} from '../../types/user.types'
interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
    },
});

export const { setUsers } = userSlice.actions;
export const  userReducer = userSlice.reducer;
