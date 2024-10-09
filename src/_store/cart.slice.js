import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartDetails: null,
    storeDetails: null,
    showCartModalHeader: false,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartDetails: (state, action) => {
            state.cartDetails = action.payload;
        },
        storeDetails: (state, action) => {
            state.storeDetails = action.payload;
        },
        showHeaderCartModal: (state, action) => {
            state.showCartModalHeader = action.payload;
        },
    },
})

export const { cartDetails, storeDetails, showHeaderCartModal } = cartSlice.actions

export default cartSlice.reducer
