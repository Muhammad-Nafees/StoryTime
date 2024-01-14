import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { getAllUsers_api } from "../../../services/api/storyfeed";

export const getAllUsers = createAsyncThunk("data/getAllUsers", async (pagination, limit) => {
    // console.log("pagination=====", pagination)
    // console.log("limit=====", limit)
    // try {
    //     const response = await getAllUsers_api(pagination, limit);
    //     return response;
    // } catch (error) {
    //     console.log("error---", error)
    // }

});

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

    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state, action) => {
            state.loading = true;
        }),

            builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
                state.data = payload
                state.loading = false;
            }),

            builder.addCase(getAllUsers.rejected, (state, action) => {
                state.error = true;
            })
    }
});

export default get_All_Users_slice.reducer;
export const { allusers } = get_All_Users_slice.actions;
