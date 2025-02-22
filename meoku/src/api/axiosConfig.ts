import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://port-0-meokuserver-1cupyg2klv9emciy.sel5.cloudtype.app/api/v1",
  timeout: 10000,
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // sessionStorage에서 accessToken 값을 가져옴
    const token = sessionStorage.getItem("access_token");
    if (token) {
      // Authorization 헤더에 Bearer 토큰 형태로 추가
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//401 에러 발생 시 refresh token으로 access token 갱신
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 무한루프 방지
    if (originalRequest.url.includes("/auth/refreshAccessToken")) {
      return Promise.reject(error);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = sessionStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const response = await axiosInstance.post(
            "/auth/refreshAccessToken",
            "",
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          const newAccessToken = response.data.access_token;
          const newRefreshToken = response.data.refresh_token;
          sessionStorage.setItem("access_token", newAccessToken);
          sessionStorage.setItem("refresh_token", newRefreshToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          sessionStorage.removeItem("access_token");
          sessionStorage.removeItem("refresh_token");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
