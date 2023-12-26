import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import { stateandcity_api, userandcity_api } from "../../services/api/auth_mdule/auth";

export const userinfocity = createAsyncThunk("userinfocity/userinfo", async (statesinfo, thunkApi) => {

    try {
        const response = await userandcity_api(statesinfo)
        console.log("reduxUserIncity--", response);
        return response

    } catch (error) {
        return thunkApi.rejectWithValue({ errorMessage: error.message });
    }
});


const userinfo_city = createSlice({

    name: "userinfocity",

    initialState: {
        userdatacity: [],
        loading: false,
        error: null
    },

    reducers: {
        userdatacity: (state, action) => {
            state.userdatacity = action.payload;
            console.log("USERDATCIT", state.userdatacity)
        }
    },



    extraReducers: (builder) => {
        builder.addCase(userinfocity.pending, (state, action) => {
            state.loading = true;
            state.userdata = null;
        }),
            builder.addCase(userinfocity.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.userdatacity = payload;
                console.log("state.-a-userdataCITY-=-", state.userdatacity)
            }),
            builder.addCase(userinfocity.rejected, (state, action) => {
                state.error = true;
            })
    }
});



export default userinfo_city.reducer;
export const { userdatacity } = userinfo_city.actions;
