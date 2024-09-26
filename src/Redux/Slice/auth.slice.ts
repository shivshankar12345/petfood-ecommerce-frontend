import { createSlice } from "@reduxjs/toolkit";
import { IntialState } from "../../types/login.types";

const INITIAL_STATE:IntialState={
    accessToken:"",
    refreshToken:"",
}

interface ReducerAction{
    type:string;
    payload?:any
}

const authSlice=createSlice({
    name:"auth",
    initialState:INITIAL_STATE,
    reducers:{
        setAccessToken(state:IntialState,action:ReducerAction){
            const {accessToken} = action.payload
            state.accessToken = accessToken;
        },
        setRefreshToken:(state:IntialState,action:ReducerAction)=>{
            const {refreshToken}=action.payload;
            state.refreshToken=refreshToken;
        },
        clearAccessToken:(state:IntialState,action:ReducerAction)=>{
            state.accessToken="";
        },
        clearRefreshToken:(state:IntialState,action:ReducerAction)=>{
            state.refreshToken="";
        }
    }
})

export const authActions=authSlice.actions
export const authReducers=authSlice.reducer

