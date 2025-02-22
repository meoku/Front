import axiosInstance from "./axiosConfig";

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const loginCheckApi = async (
  id: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/auth/login", {
    id,
    password,
  });
  console.log(response.data);
  return response.data;
};
