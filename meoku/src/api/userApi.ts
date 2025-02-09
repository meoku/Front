import axiosInstance from "./axiosConfig";

export const loginCheckApi = async (
    id:string,
    password:string
  ) => {
    const response = await axiosInstance.post("/auth/login", {id,password
    });
    return response.data;
  };