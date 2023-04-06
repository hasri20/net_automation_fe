import { fetch } from "@/utils/network";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
};

export const fetchDevice = createAsyncThunk(
  "deviceList/fetchDevice",
  async (deviceId, thunkAPI) => {
    const response = await fetch.get("/devices/" + deviceId);
    return response.data;
  }
);

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
