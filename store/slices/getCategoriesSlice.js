import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { get_Categories_Sub_Categories } from "../../services/api/categories";

export const getCategories = createAsyncThunk("data/GetCategories", async id => {

    try {
        const response = await get_Categories_Sub_Categories(id);
        console.log("response---", response)
        return response

    } catch (error) {
        console.log("error---", error)
    }
});

const get_Categories = createSlice({

    name: "GetCategories",

    initialState: {
        data: [],
        error: null,
        loading: false,
    },

    reducers: {
        get_categories: (state, { payload }) => {
            state.data = payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state, action) => {
            state.loading = true;
        }),

            builder.addCase(getCategories.fulfilled, (state, { payload }) => {
                state.data = payload
                state.loading = false;
            }),

            builder.addCase(getCategories.rejected, (state, action) => {
                state.error = true;
            })
    }
})

export default get_Categories.reducer;
export const { get_categories } = get_Categories.actions;
