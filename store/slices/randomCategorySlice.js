import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { get_Random } from "../../services/api/categories";

const randomCategorySlice = createSlice({

    name: "randomCategory",

    initialState: {
        data: [],
        error: null,
        loading: false,
        randomid: "",
        randomName: ""
    },

    reducers: {
        get_random: (state, { payload }) => {
            const { randomName, randomId } = payload;
            console.log("randomnameRTK----", randomName)
            console.log("randomidRTK----", randomId)
            state.randomid = payload;
        },
    },

});

export default randomCategorySlice.reducer;
export const { get_random } = randomCategorySlice.actions;
