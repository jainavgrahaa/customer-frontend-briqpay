import { createSlice } from "@reduxjs/toolkit";

const appConfigRaw =
  typeof window !== "undefined" ? localStorage.getItem("appConfig") : "";
const appConfig =
  appConfigRaw && appConfigRaw !== "undefined" ? JSON.parse(appConfigRaw) : {};

// create slice
export const appConfigSlice = createSlice({
  name: "appConfig",
  initialState: {
    pageData: null,
    pdpMeta: null,
    navPinned: appConfig?.sideBarPinned || false,
    navigationhierarchyid: null,
    translate: null,
    deliveryMessage: "",
    storeData: {
      email: "",
      phoneNumber: "",
    },
  },
  reducers: {
    updateSidebarBarPinStatus: (state, action) => {
      const appConfiRaw = localStorage?.getItem("appConfig");
      let appConfig =
        appConfiRaw && appConfiRaw !== "undefined"
          ? JSON.parse(appConfiRaw)
          : { sideBarPinned: false };
      appConfig.sideBarPinned = action.payload;
      localStorage?.setItem("appConfig", JSON.stringify(appConfig));

      return {
        ...state,
        navPinned: action.payload,
      };
    },
    updateNavigationhierarchyid: (state, action) => {
      state.navigationhierarchyid = action.payload;
    },
    updatePageData: (state, action) => {
      state.pageData = action.payload;
    },
    updateTranslate: (state, action) => {
      state.translate = action.payload;
    },
    updateDeliveryMessage: (state, action) => {
      state.deliveryMessage = action.payload;
    },
    updatePdpMeta: (state, action) => {
      state.pdpMeta = action.payload;
    },
    updateStoreData: (state, action) => {
      state.storeData = action.payload;
    },
  },
});

export const {
  updateSidebarBarPinStatus,
  updateNavigationhierarchyid,
  updateTranslate,
  updateDeliveryMessage,
  updatePageData,
  updatePdpMeta,
  updateStoreData,
} = appConfigSlice.actions;

export default appConfigSlice.reducer;
