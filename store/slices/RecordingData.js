import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    recordingText: [],
    saveDatatoProfile: [],
    saveRecordingVideo: "",
    checkVideoTrueorFalse: false,
    extendStoryCheckVideo: null,
    extendVideo: null,
    extendCountingVideo: 30
}

const RecordingData = createSlice({
    name: "Recording_Data",
    initialState,

    reducers: {
        recordingData: (state, action) => {
            state.recordingText.push(action.payload);
            console.log("stateRec--=-=", action.payload);
        },
        resetRecordingData: (state) => {
            state.recordingText = []
        },
        SaveDataToProfile: (state, action) => {
            state.saveDatatoProfile = action.payload;
        },
        resetSaveDataToProfile: (state) => {
            state.saveDatatoProfile = []
        },
        saveRecordingVideoUser: (state, { payload }) => {
            state.saveRecordingVideo = payload
        },
        checkVideoTrue: (state, action) => {
            state.checkVideoTrueorFalse = action.payload
        },
        extendStoryCheckVideo: (state, { payload }) => {
            state.extendStoryCheckVideo = payload
        },
        resetVideoRecording: (state) => {
            state.saveRecordingVideo = ""
        },
        extendVideo: (state, { payload }) => {
            state.extendVideo = payload
        }

        // recordingToHome(state, { payload }) {
        //     state.recordingTextToHome = payload,
        //         console.log("saveTextrecorHOm", state.recordingTextToHome)
        // },
        // recordingVideo(state, { payload }) {
        //     state.saveRecordingVideo = payload,
        //         console.log("videorecordingRed", state.saveRecordingVideo)
        // }
    }
});

export default RecordingData.reducer;
export const { recordingData, resetRecordingData, SaveDataToProfile, resetSaveDataToProfile, saveRecordingVideoUser, checkVideoTrue, extendStoryCheckVideo, resetVideoRecording, extendVideo } = RecordingData.actions
