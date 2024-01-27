import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { fetchallFeedStories } from "../../../services/api/storyfeed";


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

});

export default story_Feed_slice.reducer;
export const { storyfeed } = story_Feed_slice.actions;
