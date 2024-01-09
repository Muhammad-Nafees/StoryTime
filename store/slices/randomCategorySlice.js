import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { get_Random } from "../../services/api/categories";

export const randomCategory = createAsyncThunk("data/randomCategory", async (id) => {

    try {
        const response = await get_Random(id);
        console.log("responseRandomSlice---", response)
        return response;

    } catch (error) {
        console.log("error---", error)
    };
});



const randomCategorySlice = createSlice({

    name: "randomCategory",

    initialState: {
        data: [],
        error: null,
        loading: false,
    },

    reducers: {
        get_random: (state, { payload }) => {
            state.data = payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(randomCategory.pending, (state, action) => {
            state.loading = true;
        }),

            builder.addCase(randomCategory.fulfilled, (state, { payload }) => {
                state.data = payload
                state.loading = false;
            }),

            builder.addCase(randomCategory.rejected, (state, action) => {
                state.error = true;
            })
    }
});

export default randomCategorySlice.reducer;
export const { get_random } = randomCategorySlice.actions;
