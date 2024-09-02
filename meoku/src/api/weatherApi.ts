import axiosInstance from "./axiosConfig";

export const fetchWeatherData = async () => {
  const response = await axiosInstance.get("/meoku/getCurrentWeatherData");
  return response;
};
