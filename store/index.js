import { configureStore, combineReducers } from "@reduxjs/toolkit"
import SequencePlayer from "./slices/SequencePlayer";
import RecordingData from "./slices/RecordingData";
import Register from "./slices/Register_Slice";
import authSlice from "./slices/authSlice";
const store = configureStore({
    reducer: {
        SequencePlayer: SequencePlayer,
        RecordingData: RecordingData,
        Register: Register,
        authSlice: authSlice
    }
})

export default store;
