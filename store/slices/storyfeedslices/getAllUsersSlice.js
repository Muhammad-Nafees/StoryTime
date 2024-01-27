import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { getAllUsers_api } from "../../../services/api/storyfeed";

const get_All_Users_slice = createSlice({

    name: "GetAllUsers",

    initialState: {
        data: [],
        error: null,
        loading: false,
        userIds: ""
    },

    reducers: {
        allusers: (state, { payload }) => {
            state.userIds = payload;
            console.log("userids======", state?.userIds)
        },
    },
});

export default get_All_Users_slice.reducer;
export const { allusers } = get_All_Users_slice.actions;
