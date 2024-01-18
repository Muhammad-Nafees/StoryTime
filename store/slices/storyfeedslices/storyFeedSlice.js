import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { fetchallFeedStories } from "../../../services/api/storyfeed";

export const storyFeed = createAsyncThunk("data/storyFeed", async (pagination) => {

    // try {
    //     const response = await fetchallFeedStories(pagination);
    //     return response.data;

    // } catch (error) {
    //     console.log("error---", error)
    // }
});

const story_Feed_slice = createSlice({

    name: "StoryFeed",

    initialState: {
        data: [],
        error: null,
        loading: false,
    },

    reducers: {
        storyfeed: (state, { payload }) => {
            state.data = payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(storyFeed.pending, (state, action) => {
            state.loading = true;
        }),

            builder.addCase(storyFeed.fulfilled, (state, { payload }) => {
                state.data = payload
                state.loading = false;
            }),

            builder.addCase(storyFeed.rejected, (state, action) => {
                state.error = true;
            })
    }
});

export default story_Feed_slice.reducer;
export const { storyfeed } = story_Feed_slice.actions;
