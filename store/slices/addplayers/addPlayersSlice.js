import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    addFriends: [],
    userId: "",
    randomnames: ""
}

const addPlayers = createSlice({
    name: 'addFriends',
    initialState,

    reducers: {

        addFriends: (state, action) => {
            const { userid } = action.payload;
            const isUserExist = state.addFriends.some((friend) => friend.userid === userid);
            if (!isUserExist) {
                // If user does not exist, push to the array
                state.addFriends.push(action.payload);
            } else {
                console.log("User with the same userid already exists in the array");
            }
        },
        removeUser: (state, action) => {
            const { userid } = action.payload;
            const isUserExist = state.addFriends.some((friend) => friend.userid === userid);
            if (isUserExist) {
                // If user does not exist, push to the array
                state.addFriends.pop(action.payload);
            }
            console.log("addFriendstate-----", state.addFriends)
        },

        userId: (state, action) => {
            state.userId = action.payload
            console.log("state.--", state.userId)
        },

        randomNames: (state, payload) => {
            state.randomnames = payload
            console.log("state-random---", state.randomnames)
        }

    },
});

export const {
    addFriends,
    removeUser,
    userId,
    randomNames
} = addPlayers.actions;

export default addPlayers.reducer;
