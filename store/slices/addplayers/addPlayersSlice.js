import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    addFriends: [],
    gameFriends: [],
    userId: "",
    randomnames: "",
    storyUserImage: "",
    checkTrueOrFalse: false,
    extendStoryCheck: null,
    extendCounting: 30,
    nextRandomNumber: null,
    nextRandomNumberExtend: null,
    nextRandomNumberVideo: null,
    nextRandomNumberVideoExtend: null,
    publicAndPrivateMode: null,

};

const addPlayers = createSlice({
    name: 'addFriends',
    initialState,

    reducers: {

        addFriends: (state, action) => {
            const { userid, } = action.payload;
            const isUserExist = state.addFriends.some((friend) => friend.userid === userid);
            if (!isUserExist) {
                state.addFriends.push(action.payload);
            } else {
                console.log("User with the same userid already exists in the array");
            }
        },

        rearrangedFriends: (state, { payload }) => {
            const { selectedIndices, sequenceUser } = payload;
            for (const index of selectedIndices) {
                console.log("index==== :", index)
                if (index >= 0 && index < sequenceUser.length) {
                    state.gameFriends.push(sequenceUser[index]);
                }
            };
        },


        removeUser: (state, action) => {
            const { userid } = action.payload;
            const isUserExist = state.addFriends.some((friend) => friend.userid === userid);
            if (isUserExist) {
                state.addFriends.pop(action.payload);
            }

        },

        userId: (state, action) => {
            state.userId = action.payload;
            const isUserExist = state.addFriends.some((friend) => friend.userid === action.payload);
            console.log("state.--", isUserExist)
        },

        randomNames: (state, payload) => {
            state.randomnames = payload
            console.log("state-random---", state.randomnames);
        },

        setStoryUserImage: (state, payload) => {
            state.storyUserImage = payload
            console.log("state-storyUser---", state.storyUserImage)
        },

        checkTrueOrFalse: (state, { payload }) => {
            state.checkTrueOrFalse = payload
        },
        extendStoryCheck: (state, { payload }) => {
            state.extendStoryCheck = payload
        },
        nextRandomNum: (state, action) => {
            state.nextRandomNumber = action.payload
        },
        nextRandomNumExtend: (state, action) => {
            state.nextRandomNumberExtend = action.payload
        },
        nextRandomNumVideo: (state, action) => {
            state.nextRandomNumberVideo = action.payload
        },
        nextRandomNumVideoExtend: (state, action) => {
            state.nextRandomNumberVideoExtend = action.payload
        },
        setIsPublicOrPrivateMode: (state, { payload }) => {
            state.publicAndPrivateMode = payload
        },

    },
});

export const {
    addFriends,
    removeUser,
    userId,
    randomNames,
    checkTrueOrFalse,
    setStoryUserImage,
    extendStoryCheck,
    nextRandomNum,
    nextRandomNumExtend,
    nextRandomNumVideo,
    nextRandomNumVideoExtend,
    setIsPublicOrPrivateMode,
    rearrangedFriends
} = addPlayers.actions;

export default addPlayers.reducer;
