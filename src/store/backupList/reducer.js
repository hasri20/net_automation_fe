import { createSlice } from "@reduxjs/toolkit";
import { fetchBackupList } from "./action";

const initialState = {
  data: [],
  status: "idle",
};

export const backupListSlice = createSlice({
  name: "backupList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBackupList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBackupList.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export default backupListSlice.reducer;
