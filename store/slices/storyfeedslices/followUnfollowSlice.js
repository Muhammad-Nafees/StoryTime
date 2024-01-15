import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { follow_unfollow_api } from "../../../services/api/storyfeed";

export const followandUnfollow = createAsyncThunk("data/followUnfollow", async userids => {

    // try {
    //     const response = await follow_unfollow_api(userids);
    //     console.log("sliceFollowandunFollow", response)
    //     return response;

    // } catch (error) {
    //     console.log("error---", error)
    // }
});

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

    extraReducers: (builder) => {
        builder.addCase(followandUnfollow.pending, (state, action) => {
            state.loading = true;
            // state.isFollowing = false
        }),
            builder.addCase(followandUnfollow.fulfilled, (state, { payload }) => {
                state.data = payload
                // state.isFollowing = true
                state.loading = false;
            }),
            builder.addCase(followandUnfollow.rejected, (state, action) => {
                state.error = true;
                // state.isFollowing = false
            })
    }
});

export default follow_and_Unfollow_Slice.reducer;
export const { followunfollow } = follow_and_Unfollow_Slice.actions;
