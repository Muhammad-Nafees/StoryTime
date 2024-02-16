import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import { Base_Url, register_endpoint } from "../../../services";
import { stateandcity_api } from "../../../services/api/auth_mdule/auth";

export const userinfoState = createAsyncThunk("userinfostate/userinfo", async (countryinfo, thunkApi) => {

    try {
        const response = await stateandcity_api(countryinfo)
        console.log("reduxUserInfo", response);
        return response;

    } catch (error) {
        return thunkApi.rejectWithValue({ errorMessage: error.message });
    }
});



const userinfo_state = createSlice({

    name: "userinfostate",

    initialState: {
        userdata: [],
        loading: false,
        error: null,
        userImage:""
    },

    reducers: {
        userdata: (state, action) => {
            state.userdata = action.payload
        },

        setUserImage: (state, action)  => {
            state.userImage = action.payload;
            console.log("userImage======", state?.userImage)
        },
    },


    extraReducers: (builder) => {
        builder.addCase(userinfoState.pending, (state, action) => {
            state.loading = true;
            state.userdata = null;
        }),
            builder.addCase(userinfoState.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.userdata = payload;
                console.log("state.suerdaatA", state.userdata)
            }),
            builder.addCase(userinfoState.rejected, (state, action) => {
                state.error = true;
            })
    }
});



export default userinfo_state.reducer;
export const { userdata, setUserImage } = userinfo_state.actions;
