import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    addFriends: [],
    userId: "",
    randomnames: "",
    storyUserImage: ""
};

const addPlayers = createSlice({
    name: 'addFriends',
    initialState,

    reducers: {

        addFriends: (state, action) => {
            const { userid } = action.payload;
            const isUserExist = state.addFriends.some((friend) => friend.userid === userid);
            if (!isUserExist) {
                state.addFriends.push(action.payload);
            } else {
                console.log("User with the same userid already exists in the array");
            }
        },

        removeUser: (state, action) => {
            const { userid } = action.payload;
            const isUserExist = state.addFriends.some((friend) => friend.userid === userid);
            if (isUserExist) {
                state.addFriends.pop(action.payload);
            }
        },

        userId: (state, action) => {
            state.userId = action.payload
            console.log("state.--", state.userId)
        },

        randomNames: (state, payload) => {
            state.randomnames = payload
            console.log("state-random---", state.randomnames)
        },

        setStoryUserImage: (state, payload) => {
            state.storyUserImage = payload
            console.log("state-storyUser---", state.storyUserImage)
        }

    },
});

export const {
    addFriends,
    removeUser,
    userId,
    randomNames,
    setStoryUserImage
} = addPlayers.actions;

export default addPlayers.reducer;
