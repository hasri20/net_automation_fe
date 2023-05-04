import { configureStore } from "@reduxjs/toolkit";

import deviceListReducer from "./deviceList/deviceListSlice";
import deviceReducer from "./device/reducer";
import summaryReducer from "./summary/summarySlice";
import backupListReducer from "./backupList/reducer";

const store = configureStore({
  reducer: {
    deviceList: deviceListReducer,
    device: deviceReducer,
    summary: summaryReducer,
    backupList: backupListReducer,
  },
});

export default store;
