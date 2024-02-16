import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentDisplayUser: {},
    isNextUser: {}
}

const currentUser = createSlice({

    name: 'currentuser',
    initialState,

    reducers: {
        currentUserplay: (state, { payload }) => {
            state.currentDisplayUser = payload
        },
        isNextUserplay: (state, { payload }) => {
            state.isNextUser = payload
        }
    }

})

export const { currentUserplay, isNextUserplay } = currentUser.actions
export default currentUser.reducer
