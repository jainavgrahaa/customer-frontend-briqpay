import { createSlice } from '@reduxjs/toolkit';

const initialAlertData = {
  alertType: "info",
  msg: "",
  timeout: 5000
}

export const AlertSlice = createSlice({
  name: "alertData",
  initialState: {
    alertData: {},
    isAlertShown: false
  },
  reducers: {
    createAlert: (state, action) => {
      return {
        ...state,
        alertData: {
          ...initialAlertData,
          ...action.payload
        },
        isAlertShown: Boolean(action.payload.msg)
      };
    }
  }
});

export const { createAlert } = AlertSlice.actions;

export default AlertSlice.reducer;