import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: null,
    userProfile: null,
    accessToken: null,
    refreshToken: null,
    forgetAccesstoken: null,
    randomNumber: "",
    registerData: [],
    registerLocationData: [],
    // secondpageData: [],
    // thirdpageData: [],
};

const authSlice = createSlice({

    name: 'auth',
    initialState,

    reducers: {
        setuserRole: (state, action) => {
            state.userRole = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state, action) => {
            Object.keys(initialState).forEach(key => {
                state[key] = initialState[key];
            });
        },
        forgetResetToken: (state, action) => {
            state.forgetAccesstoken = action.payload
        },
        setRandomNumber: (state, action) => {
            state.randomNumber = action.payload
        },
        register: (state, action) => {
            const { values, countryCode, phoneCode } = action.payload;
            state.registerData = action.payload;
            console.log("register---data", state.registerData);
        },
        registerLocation: (state, action) => {
            state.registerLocationData = action.payload
        },

        // registeruser_city: (state, action) => {
        //     state.secondpageData = action.payload;
        //     console.log("registercity", state.secondpageData)
        // },
        // registeruser_password: (state, action) => {
        //     // state.token = action.payload;
        //     state.thirdpageData = action.payload;
        //     console.log("registerpassword", state.thirdpageData)
        // },

    },
});

export const {
    setuserRole,
    setAccountType,
    setUserData,
    setAccessToken,
    setRefreshToken,
    authenticate,
    setUserProfile,
    logout,
    login,
    forgetResetToken,
    setRandomNumber,
    register,
    registeruser_city,
    userLoginid,
    registeruser_password,
    registerLocation
} = authSlice.actions;

export default authSlice.reducer;
