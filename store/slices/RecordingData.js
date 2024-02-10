import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    recordingText: [],
    saveDatatoProfile: [],
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
export const { recordingData, resetRecordingData, SaveDataToProfile, resetSaveDataToProfile } = RecordingData.actions
