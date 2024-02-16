import { configureStore, createSlice } from "@reduxjs/toolkit"

const sequenceplayer = createSlice({

    name: "sequenceOfplayers",
    initialState: {

    },

    reducers: {
        UpdateSequencePlayers: (state, { payload }) => {

        }

    }

});

export const { UpdateSequencePlayers } = sequenceplayer.actions;
export default sequenceplayer.reducer;
