import { createSlice } from "@reduxjs/toolkit";
import { fetchDevice } from "./action";

const initialState = {
  data: [],
  status: "idle",
};

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDevice.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export default deviceSlice.reducer;
