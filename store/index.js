import { configureStore, combineReducers } from "@reduxjs/toolkit"
import SequencePlayer from "./slices/SequencePlayer";
import RecordingData from "./slices/RecordingData";
import Register from "./slices/Register_Slice";
import authSlice from "./slices/authSlice";
import userinfostate from "./slices/userInfoState_Slice";
import userinfocity from "./slices/userinfoCity";
import getcategories from "./slices/getCategoriesSlice";
import randomCategory from "./slices/randomCategorySlice";

const store = configureStore({
    reducer: {
        SequencePlayer: SequencePlayer,
        RecordingData: RecordingData,
        Register: Register,
        authSlice: authSlice,
        userinfostate: userinfostate,
        userinfocity: userinfocity,
        getcategories: getcategories,
        randomCategory: randomCategory

    }
});

export default store;
