import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthResponse } from "../Services/Responses/AuthResponse";

type User = {
    username?:string,
    jwt?:string
}

const initialState:AuthResponse = {
    username:undefined,
    jwt:undefined,
    role:undefined,
}

const auth_slice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        AUTHENTICATE:(state,action:PayloadAction<AuthResponse>)=>{
            state.jwt = action.payload.jwt;
            state.username = action.payload.username;
            state.role=action.payload.role,
            state.user_id=action.payload.user_id
        },
        LOGOUT:(state)=>{
            state.jwt = undefined;
            state.username = undefined;
            state.role=undefined
        }
    }
})

export const {AUTHENTICATE,LOGOUT} = auth_slice.actions
export default auth_slice.reducer;