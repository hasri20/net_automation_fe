import { configureStore } from "@reduxjs/toolkit";

import deviceListReducer from "./deviceList/deviceListSlice";

const store = configureStore({
  reducer: { deviceList: deviceListReducer },
});

export default store;
