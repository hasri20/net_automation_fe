import { fetch } from "@/utils/network";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
};

export const fetchDeviceList = createAsyncThunk(
  "deviceList/fetchDeviceList",
  async () => {
    const response = await fetch.get("/devices");
    return response.data;
  }
);

export const deviceListSlice = createSlice({
  name: "deviceList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeviceList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeviceList.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export default deviceListSlice.reducer;
