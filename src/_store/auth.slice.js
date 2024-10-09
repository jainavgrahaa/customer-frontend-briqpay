import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userList: [],
    message: null,
    roleDetails: null,
    user: null, // logged-in user detail
    userDetails: null, 
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.userList.push(action.payload)
            state.message = 'Created account successfully.'
        },
        resetForm: (state) => {
            state.message = null
        },
        loginUser: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
            state.userDetails = null;
        },
        userDetail: (state, action) => {
            state.userDetails = action.payload?.data || action.payload;
        },
    },
})

export const { addUser, loginUser, logoutUser, resetForm , userDetail } = authSlice.actions

export default authSlice.reducer
