import { createSlice } from "@reduxjs/toolkit"


const RecordingData = createSlice({
    name: "Recording_Data",

    initialState: {
        recordingText: [],
        recordingTextToHome: [],
        saveRecordingVideo: []
    },

    reducers: {
        recordingData(state, action) {
            state.recordingText = action.payload,
                console.log("stateRec--=-=", state.recordingText)
        },
        recordingToHome(state, { payload }) {
            state.recordingTextToHome = payload,
                console.log("saveTextrecorHOm", state.recordingTextToHome)
        },
        recordingVideo(state, { payload }) {
            state.saveRecordingVideo = payload,
                console.log("videorecordingRed", state.saveRecordingVideo)
        }
    }
});


export default RecordingData.reducer;
export const { recordingData, recordingToHome, recordingVideo } = RecordingData.actions
