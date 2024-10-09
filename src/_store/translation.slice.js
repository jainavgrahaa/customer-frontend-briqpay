import { createSlice } from "@reduxjs/toolkit";
let translationData;

if (typeof window !== 'undefined') {
  const translationValue = sessionStorage.getItem("translationValue");
  translationData= translationValue?.trim().toLowerCase()
} 

const initialState = {
  translationValue: translationData || "en-us",
};

export const translationSlice = createSlice({
  name: "translation",
  initialState,
  reducers: {
    translationValue: (state,action) => {
      state.translationValue = action.payload;
      sessionStorage.setItem("translationValue", state.translationValue);
    },
  },
});

export const { translationValue } = translationSlice.actions;

export default translationSlice.reducer;
