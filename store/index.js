import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userslice from "./slices/User_Slice"
import SequencePlayer from "./slices/SequencePlayer";
import RecordingData from "./slices/RecordingData";


const store = configureStore({
    reducer: {
        userSlice: userslice,
        SequencePlayer: SequencePlayer,
        RecordingData: RecordingData
    }
})

export default store;
