import { configureStore } from "@reduxjs/toolkit";

import deviceListReducer from "./deviceList/deviceListSlice";
import deviceReducer from "./device/deviceSlice";

const store = configureStore({
  reducer: { deviceList: deviceListReducer, device: deviceReducer },
});

export default store;
