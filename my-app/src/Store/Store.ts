import {  configureStore } from '@reduxjs/toolkit'
import AuthSliceReducers from "./AuthSlice"

const store = configureStore({
    reducer:{
        auth:AuthSliceReducers,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export {store}