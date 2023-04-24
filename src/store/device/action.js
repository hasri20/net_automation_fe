import { fetch } from "@/utils/network";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMemory = async (deviceId) => {
  const response = await fetch.get(`/monitor/memory/${deviceId}`);
  return response.data;
};

export const fetchCPU = async (deviceId) => {
  const response = await fetch.get(`/monitor/cpu/${deviceId}`);
  return response.data;
};

export const updateDevice = async (deviceId, payload) => {
  const response = await fetch.put(`/devices/${deviceId}`, payload);
  return response.data;
};

export const fetchDevice = createAsyncThunk(
  "deviceList/fetchDevice",
  async (deviceId, thunkAPI) => {
    const response = await fetch.get("/devices/" + deviceId);
    return response.data;
  }
);
