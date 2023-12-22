import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import { Base_Url, login_andpoint, } from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const login_user = createAsyncThunk("registration/registerUser", async (credentialslogin, thunkApi) => {

    console.log("credlogin", credentialslogin)

    try {
        const response = await fetch(Base_Url + login_andpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentialslogin),
        });

        const responseData = await response.json();
        console.log("respdara-=", responseData)
        const { accessToken, } = responseData.data;
        const { message, statusCode } = responseData;
        console.log("resTOken,", accessToken, "message", message, "status", statusCode)

        return {
            accessToken: accessToken,
            responseData: responseData,
            message: message,
            statusCode: statusCode,
        };


    } catch (error) {
        return thunkApi.rejectWithValue({ errorMessage: error.message });
    }
});



const login_auth = createSlice({

    name: "login User",

    initialState: {
        data: [],
        user: null,
        token: "",
        loading: false,
        error: null,
    },

    reducers: {

        // register: (state, action) => {
        //     // state.token = action.payload;
        //     state.firstpageData = action.payload;
        //     console.log("register", state.firstpageData)
        // },
        // registeruser_city: (state, action) => {
        //     state.secondpageData = action.payload;
        //     console.log("registercity", state.secondpageData)
        // },
        // registeruser_password: (state, action) => {
        //     // state.token = action.payload;
        //     state.thirdpageData = action.payload;
        //     console.log("registerpassword", state.thirdpageData)

        // },


        setToken: (state, { payload }) => {
            state.token = payload;
            console.log("statkomama-=-", state.token)
        },
        clearToken: (state, action) => {
            state.token = null
        }
    },



    extraReducers: (builder) => {
        builder.addCase(login_auth.pending, (state, action) => {
            state.loading = true;
            state.data = null;
        }),
            builder.addCase(login_auth.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload;
                console.log("data-=-=-=", state.data.accessToken)
            }),
            builder.addCase(login_auth.rejected, (state, action) => {
                state.error = true;
            })
    }
});



export default login_auth.reducer;
export const { setToken, clearToken } = login_auth.actions;
