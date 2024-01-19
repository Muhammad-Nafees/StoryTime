import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { storyLikedFeed } from "../../../services/api/storyfeed";

const likedstory_feed_slice = createSlice({

    name: "LikedStoryFeed",

    initialState: {
        data: [],
        error: null,
        loading: false,
        storyId: ""
    },

    reducers: {
        likedstoryfeed: (state, { payload }) => {
            state.storyId = payload;
            console.log("reduxstate===", state?.storyId)
        },
    },

});

export default likedstory_feed_slice.reducer;
export const { likedstoryfeed } = likedstory_feed_slice.actions;
