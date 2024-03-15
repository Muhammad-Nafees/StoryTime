import { configureStore, combineReducers } from "@reduxjs/toolkit"
import recordingData from "./slices/RecordingData";
import authSlice from "./slices/authSlice";
import userinfostate from "./slices/authStatesandCity/userInfoState_Slice";
import userinfocity from "./slices/authStatesandCity/userinfoCity";
import getcategories from "./slices/getCategoriesSlice";
import randomCategory from "./slices/randomCategorySlice";
import likedstoryfeed from "./slices/storyfeedslices/likedStorySlice";
import addPlayers from "./slices/addplayers/addPlayersSlice"

const store = configureStore({
    reducer: {
        recordingData: recordingData,
        authSlice: authSlice,
        userinfostate: userinfostate,
        userinfocity: userinfocity,
        getcategories: getcategories,
        randomCategory: randomCategory,
        likedstoryfeed: likedstoryfeed,
        addPlayers: addPlayers,
    }
});

export default store;
