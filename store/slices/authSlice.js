import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'react-native-fs';

const initialState = {
    user: null,
    userProfile: null,
    accessToken: null,
    refreshToken: null,
    forgetAccesstoken: null
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
    forgetResetToken
} = authSlice.actions;

export default authSlice.reducer;
