import { fetch } from "@/utils/network";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  deviceCount: {
    status: "idle",
    data: [],
  },
  statusCount: {
    status: "idle",
    data: [],
  },
  interfacesRank: {
    status: "idle",
    data: [],
  },
  status: "idle",
};

export const fetchDeviceCount = createAsyncThunk(
  "summary/fetchDeviceCount",
  async () => {
    const response = await fetch.get("/summary/count-device");
    return response.data;
  }
);

export const fetchStatusCount = createAsyncThunk(
  "summary/fetchStatusCount",
  async () => {
    const response = await fetch.get("/summary/count-status");
    return response.data;
  }
);

export const fetchInterfacesRank = createAsyncThunk(
  "summary/fetchInterfacesRank",
  async () => {
    const response = await fetch.get("/summary/interface-rank");
    return response.data;
  }
);

export const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeviceCount.pending, (state) => {
        state.deviceCount.status = "loading";
      })
      .addCase(fetchDeviceCount.fulfilled, (state, action) => {
        state.deviceCount.status = "idle";
        state.deviceCount.data = action.payload;
      })
      .addCase(fetchStatusCount.pending, (state) => {
        state.statusCount.status = "loading";
      })
      .addCase(fetchStatusCount.fulfilled, (state, action) => {
        state.statusCount.status = "idle";
        state.statusCount.data = action.payload;
      })
      .addCase(fetchInterfacesRank.pending, (state) => {
        state.interfacesRank.status = "loading";
      })
      .addCase(fetchInterfacesRank.fulfilled, (state, action) => {
        state.interfacesRank.status = "idle";
        state.interfacesRank.data = action.payload;
      });
  },
});

export const deviceCountSeriesSelector = (state) =>
  state.summary.deviceCount.data.map((data) => data.count);
export const deviceCountLabelSelector = (state) =>
  state.summary.deviceCount.data.map((data) => data.model);

export const deviceStatusSeriesSelector = (state) =>
  state.summary.statusCount.data.map((data) => data.count);
export const deviceStatusLabelSelector = (state) =>
  state.summary.statusCount.data.map((data) => data.value);

export default summarySlice.reducer;
