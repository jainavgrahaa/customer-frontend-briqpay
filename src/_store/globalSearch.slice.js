import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contentData: [],
}

export const globalSearchSlice = createSlice({
    name: 'globalSearch',
    initialState,
    reducers: {
        contentData: (state, action) => {{
            state.contentData = action.payload;
        }},
    },
})

export const { contentData } = globalSearchSlice.actions

export default globalSearchSlice.reducer
