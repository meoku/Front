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
    const token = sessionStorage.getItem("accessToken");
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


export default axiosInstance;
