import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { storyLikedFeed } from "../../../services/api/storyfeed";

const likedstory_feed_slice = createSlice({

    name: "LikedStoryFeed",

    initialState: {
        data: [],
        error: null,
        loading: false,
        storyId: "",
        likeCount: 0,
    },

    reducers: {
        likedstoryfeed: (state, { payload }) => {
            state.storyId = payload
        },
        likedCountapi: (state, action) => {
            console.log("likecount---", state.likeCount)
            state.likeCount = action.payload;
        }
    },
});

export default likedstory_feed_slice.reducer;
export const { likedstoryfeed } = likedstory_feed_slice.actions;
