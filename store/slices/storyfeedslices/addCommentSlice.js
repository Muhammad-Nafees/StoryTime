import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { add_comment_api, follow_unfollow_api } from "../../../services/api/storyfeed";

export const addComment = createAsyncThunk("data/addComment", async (formsData) => {
    console.log("formdata=====", formsData)
    try {
        const response = await add_comment_api(formsData);
        console.log("addCommentapiSlice=====", response.data)
        return response.data;

    } catch (error) {
        console.log("error---", error)
    }
});

const addCommentsSlice = createSlice({

    name: "addCommentApi",

    initialState: {
        data: [],
        error: null,
        loading: false,
        // isFollowing: false
    },

    reducers: {
        addComments_func: (state, { payload }) => {
            const newArr = { data: payload };
            console.log("near====", newArr)
        },
    },

    extraReducers: (builder) => {
        builder.addCase(addComment.pending, (state, action) => {
            state.loading = true;
        }),
            builder.addCase(addComment.fulfilled, (state, { payload }) => {
                state.data = payload
                state.loading = false;
            }),
            builder.addCase(addComment.rejected, (state, action) => {
                state.error = true;
            })
    }
});

export default addCommentsSlice.reducer;
export const { addComments_func } = addCommentsSlice.actions;
