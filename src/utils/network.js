import axios from "axios";

export const fetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  headers: {
    Accept: "application/json",
  },
});
