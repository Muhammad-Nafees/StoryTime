import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import { Base_Url, register_endpoint } from "../../services";
import { stateandcity_api } from "../../services/api/auth_mdule/auth";



export const userinfoState = createAsyncThunk("userinfostate/userinfo", async (countryCode, thunkApi) => {

    try {
        const response = await stateandcity_api(countryCode)
        console.log("reduxUserInfo", response);

    } catch (error) {
        return thunkApi.rejectWithValue({ errorMessage: error.message });
    }
});



const registerUser_Slice = createSlice({
    name: "userinfostate",

    initialState: {
        userdata: [],
        loading: false,
        error: null
    },

    reducers: {

    },


    extraReducers: (builder) => {
        builder.addCase(userinfoState.pending, (state, action) => {
            state.loading = true;
            state.userdata = null;
        }),
            builder.addCase(userinfoState.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.userdata = payload;
                console.log("data-=-=-=", state.data)
            }),
            builder.addCase(userinfoState.rejected, (state, action) => {
                state.error = true;
            })
    }
});


export default registerUser_Slice.reducer;
export const { } = registerUser_Slice.actions;
