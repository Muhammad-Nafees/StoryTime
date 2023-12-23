import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userslice from "./slices/User_Slice"
import SequencePlayer from "./slices/SequencePlayer";
import RecordingData from "./slices/RecordingData";
import Register from "./slices/Register_Slice";
import authSlice from "./slices/authSlice";
const store = configureStore({
    reducer: {
        userSlice: userslice,
        SequencePlayer: SequencePlayer,
        RecordingData: RecordingData,
        Register: Register,
        authSlice: authSlice
        // login: loginauth,
    }
})

export default store;
