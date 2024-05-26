import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const imageAxiosInstance = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
