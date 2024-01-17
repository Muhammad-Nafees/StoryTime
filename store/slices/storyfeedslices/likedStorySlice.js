import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { storyLikedFeed } from "../../../services/api/storyfeed";

export const likedStoryFeed = createAsyncThunk("data/likedstoryfeed", async (storyId) => {

    // try {
    //     const response = await storyLikedFeed(storyId);
    //     console.log("response====", response)
    //     return response.data;
    // } catch (error) {
    //     console.log("error---", error)
    // }
});

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

    extraReducers: (builder) => {
        builder.addCase(likedStoryFeed.pending, (state, action) => {
            state.loading = true;
        }),

            builder.addCase(likedStoryFeed.fulfilled, (state, { payload }) => {
                state.data = payload
                state.loading = false;
            }),

            builder.addCase(likedStoryFeed.rejected, (state, action) => {
                state.error = true;
            })
    }
});

export default likedstory_feed_slice.reducer;
export const { likedstoryfeed } = likedstory_feed_slice.actions;
