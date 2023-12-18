import { createSlice } from "@reduxjs/toolkit"


const RecordingData = createSlice({
    name: "Recording_Data",

    initialState: {
        recordingText: []
    },


    reducers: {
        recordingData(state, action) {
            state.recordingText = action.payload,
                console.log("stateRec--=-=", state)
        }
    }


})



export default RecordingData.reducer;
export const { recordingData } = RecordingData.actions
