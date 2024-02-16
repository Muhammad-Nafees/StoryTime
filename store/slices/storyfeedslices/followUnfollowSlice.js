import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";


const follow_and_Unfollow_Slice = createSlice({

    name: "FollowAndUnfollow",

    initialState: {
        data: [],
        error: null,
        loading: false,
        isFollowing: false
    },

    reducers: {
        followunfollow: (state, { payload }) => {
            state.isFollowing = payload;
        },
    },

});

export default follow_and_Unfollow_Slice.reducer;
export const { followunfollow } = follow_and_Unfollow_Slice.actions;
