import { DrawerContentScrollView } from '@react-navigation/drawer';
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
    addTagPlayers: [],
    isHidden: false,
    friendId: "",
    addUrlid: "",
    urlCategoryname: "",
    urlSubcategoryname: ""
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
            }
        },
        resetFriends: (state) => {
            state.addFriends = [];
        },

        rearrangedFriends: (state, { payload }) => {
            const { selectedIndices, sequenceUser, } = payload;

            state.gameFriends = [];
            for (const index of selectedIndices) {
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
            state.addFriends.some((friend) => friend.userid === action.payload);
        },

        randomNames: (state, payload) => {
            state.randomnames = payload
        },

        setStoryUserImage: (state, payload) => {
            state.storyUserImage = payload
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
        addTagPlayers: ({ addTagPlayers }, { payload }) => {
            const { userid } = payload;
            const isAlreadyExist = addTagPlayers.some((friend) => friend?.userid === userid)
            if (!isAlreadyExist) {
                addTagPlayers.push(payload)
            }
        },
        tagRemoveUsers: ({ addTagPlayers }, { payload }) => {
            const { userid } = payload;
            const isAlreadyExist = addTagPlayers.some((friend) => friend?.userid === userid)
            if (isAlreadyExist) {
                addTagPlayers.pop(payload)
            };
        },
        isHidden: (state, { payload }) => {
            console.log("payload value---- :", payload)
            console.log("state.isHidden---- :", state.isHidden)
            state.isHidden = payload
        },
        setAddUrlId: (state, { payload }) => {
            state.addUrlid = payload;
        },

        categorynameUrl: (state, { payload }) => {
            state.urlCategoryname = payload;
        },
        subCategorynameUrl: (state, { payload }) => {
            state.urlSubcategoryname = payload;
        },
        setFriendId: (state, action) => {
            state.friendId = action.payload
            console.log("state.fridn Id", state.friendId);
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
    rearrangedFriends,
    addTagPlayers,
    tagRemoveUsers,
    resetFriends,
    isHidden,
    setAddUrlId,
    categorynameUrl,
    subCategorynameUrl,
    setFriendId
} = addPlayers.actions;

export default addPlayers.reducer;
