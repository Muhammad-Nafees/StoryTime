import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: null,
    userProfile: null,
    accessToken: null,
    refreshToken: null,
    forgetAccesstoken: null,
    randomNumber: "",
    firstpageData: [],
    secondpageData: [],
    thirdpageData: [],
    username: ""
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
        logout: (state) => {
            state.isAuthenticated = false;
        },
        forgetResetToken: (state, action) => {
            state.forgetAccesstoken = action.payload
        },
        setRandomNumber: (state, action) => {
            state.randomNumber = action.payload
        },
        register: (state, action) => {
            const { username } = state.firstpageData;
            console.log("username", username)
            state.firstpageData = action.payload;
            console.log("register---data", state.firstpageData);
        },
        registeruser_city: (state, action) => {
            state.secondpageData = action.payload;

            console.log("registercity", state.secondpageData)
        },
        registeruser_password: (state, action) => {
            state.thirdpageData = action.payload;
            console.log("registerpassword", state.thirdpageData)
        },
        usernameSequence: (state, { payload }) => {
            state.username = payload;

            // AsyncStorage.setItem('username', payload)
            //     .then(() => {
            //         console.log('Username saved to AsyncStorage');
            //     })
            //     .catch((error) => {
            //         console.error('Error saving username to AsyncStorage:', error);
            //     });

            console.log("----------usernameauh--", state.username)
        }
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
    usernameSequence,
    registeruser_password
} = authSlice.actions;

export default authSlice.reducer;
