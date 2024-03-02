import { createSlice, } from "@reduxjs/toolkit";

const story_Feed_slice = createSlice({

    name: "StoryFeed",

    initialState: {

        storyUserId: ""
    },

    reducers: {

        storyUserId: (state, { payload }) => {
            state.storyUserId = payload;
        }

    },

});



export default story_Feed_slice.reducer;
export const {
    storyfeed,
    storyUserId
} = story_Feed_slice.actions;
