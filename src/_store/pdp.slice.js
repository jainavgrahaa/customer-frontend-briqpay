import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quickDelivery: {
    loader: true,
    deliveryData: [],
    columns: [],
    page: 1,
    totalRecords: 0,
  },
};

export const pdpPageSlice = createSlice({
  name: "pdp",
  initialState,
  reducers: {
    updateQuickDelivery: (state, action) => {
      const [key, value] = Object.entries(action.payload).flat();
      state.quickDelivery[key] = value;
    },
  },
});

export const { updateQuickDelivery } = pdpPageSlice.actions;

export default pdpPageSlice.reducer;
