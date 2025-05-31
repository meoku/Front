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

export const isAdminCheckApi = async () => {
  const response = await axiosInstance.get("/admin/getAdminYn");
  return response.status;
};

export const checkDuplicateId = async (id: string) => {
  const response = await axiosInstance.post(`/auth/checkDuplicateId?checkedId=${id}`);
  return response.data;
};

export const signUpApi = async (id: string, password: string, sex: string, age: string) => {
  const response = await axiosInstance.post("/auth/signup", {
    id,
    password,
    sex,
    age,
  });
  return response.data;
};
