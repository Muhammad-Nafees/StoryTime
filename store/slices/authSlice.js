import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: null,
    userProfile: null,
    accessToken: null,
    refreshToken: null,
    forgetAccesstoken: null,
    randomNumber: "",
    registerData: [],
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
            console.log("access token-- :", state.accessToken);
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
            state.registerData = action.payload;
            console.log("STATE REGISTERED DATA=== :", state.registerData)
        },
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
    userLoginid,
} = authSlice.actions;

export default authSlice.reducer;
