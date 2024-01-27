import { configureStore, createSlice } from "@reduxjs/toolkit"

const sequenceplayer = createSlice({
    name: "sequenceOfplayers",
    initialState: {
        counters: [null, null, null, null]
    },

    reducers: {
        UpdateSequencePlayers: (state, { payload }) => {
            state.counters = payload
            console.log("stat", state)
        }

    }

});

export const { UpdateSequencePlayers } = sequenceplayer.actions;
export default sequenceplayer.reducer;
