import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import { registerUser } from "../../services/api/Register_Api";


const initialState = {
    data: [],
    token: "",
    loading: false,
    error: null,
}

export const registeruser = createAsyncThunk("registration/registerUser", async (credentials) => {
    try {
        const response = await registerUser(credentials);
        console.log("respnse--", response.data)
        return response.data;

    } catch (error) {
        throw error;
    }
});



const registerUser_Slice = createSlice({

    name: "Register User",
    initialState,

    reducers: {
        register: (state, action) => {
            state.data = action.payload,
                console.log("state.data", state.data)
        }
    },

    extraReducers: (builder) => {
        builder.addCase(registeruser.pending, (state, action) => {
            state.loading = true;
        }),
            builder.addCase(registeruser.fulfilled, (state, action) => {
                state.loading = false;
            }),
            builder.addCase(registeruser.rejected, (state, action) => {
                state.error = true;
            })
    }

});

export default registerUser_Slice.reducer;
export const { register, } = registerUser_Slice.actions;
