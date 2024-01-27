import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { get_Comment_api, } from "../../../services/api/storyfeed";

const getCommentsSlice = createSlice({

    name: "getCommentApi",

    initialState: {
        data: [],
        error: null,
        loading: false,
        getCommentstoryId: ""
    },

    reducers: {
        getComments_func: (state, { payload }) => {
            state.getCommentstoryId = payload
        },
    },

});

export default getCommentsSlice.reducer;
export const { getComments_func } = getCommentsSlice.actions;
