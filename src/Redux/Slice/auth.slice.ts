import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { IntialState } from "../../types/login.types";

const INITIAL_STATE:IntialState={
    accessToken:"",
    refreshToken:"",
}

const authSlice=createSlice({
    name:"auth",
    initialState:INITIAL_STATE,
    reducers:{
        setAccessToken:(state:IntialState,action:PayloadAction<{ accessToken: string }>)=>{
            const {accessToken} = action.payload
            state.accessToken = accessToken;
        },
        setRefreshToken:(state:IntialState,action:PayloadAction<{ refreshToken: string }>)=>{
            const {refreshToken}=action.payload;
            state.refreshToken=refreshToken;
        },
        clearAccessToken:(state:IntialState)=>{
            state.accessToken="";
        },
        clearRefreshToken:(state:IntialState)=>{
            state.refreshToken="";
        }
    }
})

export const {setAccessToken,setRefreshToken,clearAccessToken,clearRefreshToken}=authSlice.actions
export const authReducers=authSlice.reducer

