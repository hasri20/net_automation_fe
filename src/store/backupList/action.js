import { fetch } from "@/utils/network";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBackupList = createAsyncThunk(
  "backup/fetchBackupList",
  async () => {
    const response = await fetch.get("/backup");
    return response.data;
  }
);
