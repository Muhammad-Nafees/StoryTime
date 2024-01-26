import { configureStore, combineReducers } from "@reduxjs/toolkit"
import SequencePlayer from "./slices/SequencePlayer";
import RecordingData from "./slices/RecordingData";
import authSlice from "./slices/authSlice";
import userinfostate from "./slices/authStatesandCity/userInfoState_Slice";
import userinfocity from "./slices/authStatesandCity/userinfoCity";
import getcategories from "./slices/getCategoriesSlice";
import randomCategory from "./slices/randomCategorySlice";
import likedstoryfeed from "./slices/storyfeedslices/likedStorySlice";
import getallUsers from "./slices/storyfeedslices/getAllUsersSlice";
import followandunfollow from "./slices/storyfeedslices/followUnfollowSlice";
import getComment from "./slices/storyfeedslices/getCommentsSlice";
import addPlayers from "./slices/addplayers/addPlayersSlice"

const store = configureStore({
    reducer: {
        SequencePlayer: SequencePlayer,
        RecordingData: RecordingData,
        authSlice: authSlice,
        userinfostate: userinfostate,
        userinfocity: userinfocity,
        getcategories: getcategories,
        randomCategory: randomCategory,
        likedstoryfeed: likedstoryfeed,
        getallUsers: getallUsers,
        followandunfollow: followandunfollow,
        getComment: getComment,
        addPlayers: addPlayers
    }
});

export default store;
