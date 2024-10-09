import { configureStore } from "@reduxjs/toolkit";

import alertsReducer from "./alert.slice";
import appConfigReducer from "./appconfig.slice";
import authReducer from "./auth.slice";
import cartReducer from "./cart.slice";
import globalSearchReducer from "./globalSearch.slice";
import translationReducer from "./translation.slice";
import chooseSettingsReducer from "./chooseSettings.slice";
import chooseDiamondReducer from "./chooseDiamond.slice";
import plpPageReducer from "./plp.slice";
import pdpPageReducer from "./pdp.slice";

export const store = configureStore({
  reducer: {
    alert: alertsReducer,
    appconfig: appConfigReducer,
    cart: cartReducer,
    auth: authReducer,
    translation: translationReducer,
    globalSearch: globalSearchReducer,
    chooseSettings: chooseSettingsReducer,
    chooseDiamond: chooseDiamondReducer,
    plp: plpPageReducer,
    pdp: pdpPageReducer,
  },
});
