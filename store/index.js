import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userslice from "./slices/User_Slice"


const store = configureStore({
    reducer: {
        userSlice: userslice
    }
})

export default store;
