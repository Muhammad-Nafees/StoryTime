import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userslice from "./slices/User_Slice"
import SequencePlayer from "./slices/SequencePlayer";
import RecordingData from "./slices/RecordingData";
import Register from "./slices/Register_Slice";
import loginauth from "./slices/Login_auth"


const store = configureStore({
    reducer: {
        userSlice: userslice,
        SequencePlayer: SequencePlayer,
        RecordingData: RecordingData,
        Register: Register,
        login: loginauth,
    }
})

export default store;
