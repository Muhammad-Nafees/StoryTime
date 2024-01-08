// import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
// import userService from "../../services/api/Register_Api";
// import { Base_Url, register_endpoint } from "../../services";
// import AsyncStorage from "@react-native-async-storage/async-storage";



// export const registeruser = createAsyncThunk("registration/registerUser", async (credentials, thunkApi) => {

//     try {


//     } catch (error) {
//         return thunkApi.rejectWithValue({ errorMessage: error.message });
//     }
// });



// const registerUser_Slice = createSlice({

//     name: "Register User",

//     initialState: {
//         data: [],
//         user: null,
//         token: null,
//         loading: false,
//         firstpageData: [],
//         secondpageData: [],
//         thirdpageData: [],
//         error: null,
//     },

//     reducers: {
//         register: (state, action) => {
//             // state.token = action.payload;
//             state.firstpageData = action.payload
//             console.log("register---data", state.firstpageData);
//         },
//         registeruser_city: (state, action) => {
//             state.secondpageData = action.payload;

//             console.log("registercity", state.secondpageData)
//         },
//         registeruser_password: (state, action) => {
//             // state.token = action.payload;
//             state.thirdpageData = action.payload;
//             console.log("registerpassword", state.thirdpageData)

//         },
//         setToken: (state, { payload }) => {
//             state.token = payload;
//         },
//         clearToken: (state, action) => {
//             state.token = null
//         }

//     },



//     extraReducers: (builder) => {
//         builder.addCase(registeruser.pending, (state, action) => {
//             state.loading = true;
//             state.data = null;
//         }),
//             builder.addCase(registeruser.fulfilled, (state, { payload }) => {
//                 state.loading = false;
//                 state.data = payload;
//                 console.log("data-=-=-=", state.data)
//             }),
//             builder.addCase(registeruser.rejected, (state, action) => {
//                 state.error = true;
//             })
//     }
// });


// export default registerUser_Slice.reducer;
// export const { register, registeruser_city, registeruser_password, setToken, clearToken } = registerUser_Slice.actions;
