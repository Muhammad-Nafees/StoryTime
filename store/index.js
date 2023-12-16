import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userslice from "./slices/User_Slice"
import SequencePlayer from "./slices/SequencePlayer";


const store = configureStore({
    reducer: {
        userSlice: userslice,
        SequencePlayer: SequencePlayer,
    }
})

export default store;
