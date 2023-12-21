import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    name: ""
};

const user_Slice = createSlice({

    name: "userSlice",
    initialState: initialState,

    reducers: {
        login(state, { payload }) {
            state.name = payload;
        }
    }

});


export default user_Slice.reducer;
export const { login } = user_Slice.actions;
