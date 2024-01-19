import { configureStore, combineReducers } from "@reduxjs/toolkit"
import SequencePlayer from "./slices/SequencePlayer";
import RecordingData from "./slices/RecordingData";
import authSlice from "./slices/authSlice";
import userinfostate from "./slices/authStatesandCity/userInfoState_Slice";
import userinfocity from "./slices/authStatesandCity/userinfoCity";
import getcategories from "./slices/getCategoriesSlice";
import randomCategory from "./slices/randomCategorySlice";
import storyfeed from "./slices/storyfeedslices/storyFeedSlice";
import likedstoryfeed from "./slices/storyfeedslices/likedStorySlice";
import getallUsers from "./slices/storyfeedslices/getAllUsersSlice";
import followandunfollow from "./slices/storyfeedslices/followUnfollowSlice";
import getComment from "./slices/storyfeedslices/getCommentsSlice";

const store = configureStore({
    reducer: {
        SequencePlayer: SequencePlayer,
        RecordingData: RecordingData,
        authSlice: authSlice,
        userinfostate: userinfostate,
        userinfocity: userinfocity,
        getcategories: getcategories,
        randomCategory: randomCategory,
        storyfeed: storyfeed,
        likedstoryfeed: likedstoryfeed,
        getallUsers: getallUsers,
        followandunfollow: followandunfollow,
        getComment: getComment,
    }
});

export default store;
