import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    addFriends: [],
    gameFriends: [],
    userId: "",
    randomnames: "",
    storyUserImage: "",
    isCheck: false,
    isExtendStory: null,
    extendCounting: 30,
    nextRandomNumber: null,
    nextRandomNumberExtend: null,
    nextRandomNumberVideo: null,
    nextRandomNumberVideoExtend: null,
    addTagPlayers: [],
    friendId: "",
    addUrlid: "",
    urlCategoryname: "",
    urlSubcategoryname: "",
    responseUsersProfile: null,
    endUserProfile: true,
    randomForProfileUpdate: "",

    categoriesId: "",
    subcategoriesId: "",
    playerscontributorsIds: [],

    recordingText: [],
    saveRecordingVideo: "",
    isCheckVideoTrue: false,
    isExtendStoryVideo: null,
    extendVideo: null,
    extendCountingVideo: 30

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

        isCheckValue: (state, { payload }) => {
            state.isCheck = payload
        },
        isExtendStoryCheck: (state, { payload }) => {
            state.isExtendStory = payload
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
        setResponseUsersProfile: (state, action) => {
            state.responseUsersProfile = action.payload
            console.log("state.fridn Id", state.friendId);
        },
        setEndUserProfile: (state, action) => {
            state.endUserProfile = action.payload
            console.log("state.fridn Id", state.friendId);
        },
        setRandomForProfileUpdate: (state, action) => {
            state.randomForProfileUpdate = action.payload
        },


        setCategoriesId: (state, action) => {
            state.categoriesId = action.payload;
            console.log("payload----getCategories", action.payload)
        },
        setSubCategoriesId: (state, action) => {
            state.subcategoriesId = action.payload
            console.log("payload----subCategories", action.payload)
        },
        playerContributorsIds: (state, { payload }) => {
            const { userid } = payload;
            state.playerscontributorsIds.push(payload)
        },


        recordingData: (state, action) => {
            state.recordingText.push(action.payload);
            console.log("stateRec--=-=", action.payload);
        },
        resetRecordingData: (state) => {
            state.recordingText = []
        },
        saveRecordingVideoUser: (state, { payload }) => {
            state.saveRecordingVideo = payload
        },

        checkVideoTrue: (state, action) => {
            state.isCheckVideoTrue = action.payload
        },


        extendStoryCheckVideo: (state, { payload }) => {
            state.isExtendStoryVideo = payload
        },
        resetVideoRecording: (state) => {
            state.saveRecordingVideo = ""
        },
        extendVideo: (state, { payload }) => {
            state.extendVideo = payload
        },


    },
});

export const {
    addFriends,
    removeUser,
    userId,
    randomNames,
    isCheckValue,
    setStoryUserImage,
    isExtendStoryCheck,
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
    setFriendId,
    setResponseUsersProfile,
    setEndUserProfile,
    setRandomForProfileUpdate,


    get_categories,
    setCategoriesId,
    setSubCategoriesId,
    playerContributorsIds,
    recordingData,
    resetRecordingData,
    saveRecordingVideoUser,
    checkVideoTrue,
    extendStoryCheckVideo,
    resetVideoRecording,
    extendVideo,


} = addPlayers.actions;

export default addPlayers.reducer;
