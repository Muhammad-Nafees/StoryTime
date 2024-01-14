import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { get_Comment_api, } from "../../../services/api/storyfeed";

export const getComment = createAsyncThunk("data/getComment", async (storyId) => {

    try {
        const response = await get_Comment_api(storyId);
        console.log("addCommentapiSlice=====", response.data)
        return response.data;

    } catch (error) {
        console.log("error---", error)
    }
});

const getCommentsSlice = createSlice({

    name: "getCommentApi",

    initialState: {
        data: [],
        error: null,
        loading: false,
        // isFollowing: false
    },

    reducers: {
        getComments_func: (state, { payload }) => {
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getComment.pending, (state, action) => {
            state.loading = true;
        }),
            builder.addCase(getComment.fulfilled, (state, { payload }) => {
                state.data = payload
                state.loading = false;
            }),
            builder.addCase(getComment.rejected, (state, action) => {
                state.error = true;
            })
    }
});

export default getCommentsSlice.reducer;
export const { getComments_func } = getCommentsSlice.actions;
