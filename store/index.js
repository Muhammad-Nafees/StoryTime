import { configureStore, combineReducers } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice";
import userinfostate from "./slices/authStatesandCity/userInfoState_Slice";
import userinfocity from "./slices/authStatesandCity/userinfoCity";
import likedstoryfeed from "./slices/storyfeedslices/likedStorySlice";
import getcategories from "./slices/categoriesSlice/categoriesSlice"



const store = configureStore({
    reducer: {
        authSlice: authSlice,
        userinfostate: userinfostate,
        userinfocity: userinfocity,
        getcategories: getcategories,
        likedstoryfeed: likedstoryfeed,
    }
});

export default store;
