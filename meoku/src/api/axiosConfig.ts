import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://port-0-meokuserver-1cupyg2klv9emciy.sel5.cloudtype.app/api/v1",
  timeout: 10000,
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    window.location.href = "/login";
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

// 401 에러 발생 시 refresh token으로 access token 갱신
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 만약 401 에러가 발생했고, 아직 재시도하지 않았다면(_retry 플래그로 체크)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = sessionStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          // refresh token을 사용해 새로운 access token 요청
          const response = await axiosInstance.post(
            "/auth/refreshAccessToken",
            {
              refreshToken,
            }
          );
          const newAccessToken = response.data.access_token;
          const newRefreshToken = response.data.refresh_token;
          // 새로운 access token을 저장
          sessionStorage.setItem("access_token", newAccessToken);
          sessionStorage.setItem("refresh_token", newRefreshToken);
          // 원래 요청의 헤더에 새로운 토큰 적용
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          // 원래 요청 재시도
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // refresh token이 만료되었거나 갱신에 실패
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
